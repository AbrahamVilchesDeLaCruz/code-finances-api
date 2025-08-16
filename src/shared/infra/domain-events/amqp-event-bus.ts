/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventBus } from '@shared/domain/event/event-bus';
import amqp, {
  type Connection,
  Channel,
  ConsumeMessage,
  Options,
  type ChannelModel,
} from 'amqplib';
import { CouldNotConnectToBus } from './could-not-connect-to-bus.exception';
import { DomainEvent } from '@shared/domain/event/domain-event';

@Injectable()
export class AmqpEventBus implements EventBus, OnApplicationShutdown {
  private readonly logger = new Logger(AmqpEventBus.name);

  private connection!: Connection;
  private channel!: Channel;
  private channelModel: ChannelModel;

  private readonly url: string;
  private readonly exchangeType: string;
  private readonly maxRetries: number;
  private readonly retryDelay: number;

  constructor(private readonly configService: ConfigService) {
    this.url = this.configService.get<string>('amqp.uri')!;
    this.exchangeType = this.configService.get<string>('amqp.exchange_type')!;
    this.maxRetries = this.configService.get<number>('amqp.max_retries')!;
    this.retryDelay = this.configService.get<number>('amqp.retry_delay')!;
  }

  // -------------------------------
  // Connection handling
  // -------------------------------
  private async connect(): Promise<void> {
    let attempt = 0;
    while (attempt < this.maxRetries) {
      try {
        this.logger.log(`Connecting to RabbitMQ (attempt ${attempt + 1})...`);
        this.channelModel = await amqp.connect(this.url);
        this.connection = this.channelModel.connection;
        this.channel = await this.channelModel.createChannel();
        this.logger.log('Connected to RabbitMQ');
        return;
      } catch (err: any) {
        this.logger.error(`Connection failed: ${err}`);
        attempt++;
        await this.delay(this.retryDelay);
      }
    }
    throw new CouldNotConnectToBus();
  }

  private async getChannel(): Promise<Channel> {
    if (!this.connection) {
      await this.connect();
    }
    return this.channel;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // -------------------------------
  // Exchange and queue setup
  // -------------------------------
  private async ensureExchange(exchangeName: string): Promise<void> {
    await this.channel.assertExchange(exchangeName, this.exchangeType, {
      durable: true,
    });
  }

  private async setupQueues(
    queueName: string,
    exchangeName: string,
    bindingKey: string,
  ): Promise<void> {
    await this.ensureExchange(exchangeName);

    // Principal - sin DLX, manejamos reintentos manualmente
    await this.channel.assertQueue(queueName, { durable: true });

    // Retry - TTL y luego vuelve a principal
    await this.channel.assertQueue(`${queueName}.retry`, {
      durable: true,
      messageTtl: this.retryDelay,
      deadLetterExchange: exchangeName,
      deadLetterRoutingKey: queueName,
    });

    // Dead-letter - mensajes no procesados
    await this.channel.assertQueue(`${queueName}.dead_letter`, {
      durable: true,
    });

    // Bind principal
    await this.channel.bindQueue(queueName, exchangeName, bindingKey);
    await this.channel.bindQueue(queueName, exchangeName, queueName);
  }

  // -------------------------------
  // Publishing
  // -------------------------------
  public async publish(events: DomainEvent[]): Promise<void> {
    if (!events.length) return;

    const channel = await this.getChannel();
    const exchangeName = this.configService.get<string>('amqp.exchange_name')!;
    await this.ensureExchange(exchangeName);

    for (const event of events) {
      const routingKey = event.eventName();
      const message = Buffer.from(event.decode());

      this.logger.log(
        `Publishing event "${routingKey}" to exchange "${exchangeName}"`,
      );

      channel.publish(
        exchangeName,
        routingKey,
        message,
        this.getMessageOptions(),
      );
    }
  }

  private getMessageOptions(): Options.Publish {
    return {
      persistent: true,
      contentType: 'application/json',
    };
  }

  // -------------------------------
  // Consuming
  // -------------------------------
  public async consume<T extends DomainEvent>(
    queueName: string,
    bindingKey: string,
    exchangeName: string,
    domainEvent: new (...args: any[]) => T,
    handler: (event: T) => Promise<void>,
  ): Promise<void> {
    const channel = await this.getChannel();
    await this.setupQueues(queueName, exchangeName, bindingKey);

    this.logger.log(
      `Consuming from "${queueName}" (binding "${bindingKey}") on exchange "${exchangeName}"`,
    );

    await channel.consume(queueName, (msg) => {
      if (!msg) return;
      void this.handleMessage(msg, queueName, domainEvent, handler);
    });
  }

  private async handleMessage<T extends DomainEvent>(
    msg: ConsumeMessage,
    queueName: string,
    domainEvent: new (...args: any[]) => T,
    handler: (event: T) => Promise<void>,
  ): Promise<void> {
    try {
      const content = msg.content.toString();
      const parsed = domainEvent.prototype.encode(content);
      const eventInstance = new domainEvent(
        parsed['aggregateId'],
        parsed['data'],
        parsed['eventId'],
        parsed['occurredOn'],
      );

      await handler(eventInstance);
      this.channel.ack(msg);
    } catch (err) {
      this.logger.error(`Error processing message: ${err}`);
      this.retryOrDeadLetter(msg, queueName);
    }
  }

  private retryOrDeadLetter(msg: ConsumeMessage, queueName: string): void {
    const originQueue = msg.fields.routingKey;

    if (originQueue === queueName) {
      // Primer fallo → retry
      this.channel.sendToQueue(
        `${queueName}.retry`,
        msg.content,
        msg.properties,
      );
    } else {
      // Fallo después de retry → dead-letter
      this.channel.sendToQueue(
        `${queueName}.dead_letter`,
        msg.content,
        msg.properties,
      );
    }

    this.channel.ack(msg); // Sacamos el mensaje de la cola actual
  }

  async onApplicationShutdown(): Promise<void> {
    await this.channel?.close();
    await this.channelModel.close();
  }
}
