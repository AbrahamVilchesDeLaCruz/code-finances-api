/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DomainEvent } from '@shared/domain/event/domain-event';
import { EventBus } from '@shared/domain/event/event-bus';
import {
  Channel,
  type ChannelModel,
  connect,
  Connection,
  ConsumeMessage,
  MessagePropertyHeaders,
  Options,
} from 'amqplib';
import { CouldNotConnectToBus } from './could-not-connect-to-bus.exception';
import { InvalidDomainEvent } from '@shared/domain/event/invalid-domain-event.exception';

@Injectable()
export class AmqpEventBus implements EventBus {
  private readonly url: string;
  private readonly exchangeType: string;
  private readonly maxRetries: number;
  private readonly retryDelay: number;
  private connection: Connection | null;
  private channel: Channel | null;

  constructor(private readonly configService: ConfigService) {
    this.url = configService.get<string>('amqp.uri')!;
    this.exchangeType = configService.get<string>('amqp.exchange_type')!;
    this.maxRetries = configService.get<number>('amqp.max_retries')!;
    this.retryDelay = configService.get<number>('amqp.retry_delay')!;
  }

  private async getConnection(): Promise<ChannelModel> {
    if (!this.connection) {
      try {
        this.connection = await connect(this.url);

        this.connection.on('close', () => {
          console.warn('AMQP connection closed');
          this.connection = null;
          this.channel = null;
        });

        this.connection.on('error', (err: unknown) => {
          if (err instanceof Error) {
            console.error(`AMQP connection error: ${err.message}`);
          } else {
            console.error(`AMQP connection error: ${String(err)}`);
          }
        });

        console.info('AMQP connection established');
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(`Failed to establish AMQP connection: ${err.message}`);
        } else {
          console.error(`Failed to establish AMQP connection: ${String(err)}`);
        }
        throw new CouldNotConnectToBus();
      }
    }
    return this.connection!;
  }

  private async getChannel(): Promise<Channel> {
    if (!this.channel) {
      const connection = await this.getConnection();

      this.channel = await connection.createChannel();

      this.channel.on('error', (error) => {
        console.error(`AMQP channel error: ${error.message}`);
        this.channel = null;
      });

      console.info('AMQP channel created');
    }

    return this.channel!;
  }

  private async setupQueues(
    queueName: string,
    exchangeName: string,
    bindingKey: string,
  ): Promise<void> {
    const channel = await this.getChannel();

    await channel.assertExchange(exchangeName, this.exchangeType);

    await channel.assertQueue(queueName, { durable: true });

    await channel.assertQueue(`${queueName}.retry`, {
      durable: true,
      messageTtl: this.retryDelay,
      deadLetterExchange: exchangeName,
      deadLetterRoutingKey: queueName,
    });

    await channel.assertQueue(`${queueName}.dead_letter`, {
      durable: true,
    });

    await channel.bindQueue(queueName, exchangeName, bindingKey);
    await channel.bindQueue(queueName, exchangeName, queueName);
  }

  async consume(
    queueName: string,
    bindingKey: string,
    exchangeName: string,
    DomainEventInstance: new (...args: any[]) => DomainEvent,
    handler: (event: DomainEvent) => Promise<void>,
  ): Promise<void> {
    await this.setupQueues(queueName, exchangeName, bindingKey);

    const channel = await this.getChannel();
    await channel.prefetch(1);

    await channel.consume(queueName, async (msg: ConsumeMessage) => {
      if (msg) {
        try {
          await this.handle(msg, DomainEventInstance, handler);
          channel.ack(msg);
        } catch (error) {
          console.error(`[HandlerError] ${error.message}`);
          channel.nack(msg, false, false);
        }
      }
    });

    console.info(`[Consume] Set up → ${queueName}`);
  }

  private async retry(
    message: any,
    headers: MessagePropertyHeaders,
    msg: ConsumeMessage,
  ): Promise<void> {
    const retryCount = (headers.retries || 0) + 1;
    const retryQueue = `${msg.fields.routingKey}.retry`;
    const channel = await this.getChannel();

    console.warn(`[Retry #${retryCount}] → ${retryQueue}`);

    channel.sendToQueue(retryQueue, Buffer.from(JSON.stringify(message)), {
      headers: {
        ...headers,
        retries: retryCount,
      },
    });
  }

  private async sendToDlx(
    message: any,
    error: string,
    queueName: string,
  ): Promise<void> {
    const dlq = `${queueName}.dead_letter`;
    const channel = await this.getChannel();

    console.warn(`[DLX] → ${dlq} | Reason: ${error}`);

    channel.sendToQueue(dlq, Buffer.from(JSON.stringify(message)), {
      headers: {
        error,
        retries: message.retries,
      },
    });
  }

  async publish(domainEvents: DomainEvent[]): Promise<void> {
    const channel = await this.getChannel();
    const exchange = this.configService.get<string>('amqp.exchange_name');

    for (const event of domainEvents) {
      channel.publish(
        exchange,
        event.eventName(),
        Buffer.from(event.decode()),
        this.opts(event),
      );
    }
  }

  private opts(
    event: DomainEvent,
    retries?: number,
    error?: string,
  ): Options.Publish {
    return {
      contentType: 'application/json',
      contentEncoding: 'utf-8',
      priority: 0,
      messageId: event.eventId.value,
      timestamp: event.occurredOn.value.getTime(),
      type: event.eventName(),
      deliveryMode: 2,
      headers: {
        error,
        retries: retries ? retries + 1 : 0,
        type: event.eventName(),
      },
    };
  }

  private instanceDomainEvent(
    DomainEventInstance: new (...args: any[]) => DomainEvent,
    message: any,
  ): DomainEvent {
    if (message.data) {
      return new DomainEventInstance(
        message.aggregateId,
        message.data,
        message.eventId,
        new Date(message.occurredOn as string),
      );
    }

    throw new InvalidDomainEvent(JSON.stringify(message));
  }

  private async handle(
    msg: ConsumeMessage,
    DomainEventInstance: new (...args: any[]) => DomainEvent,
    handler: (event: DomainEvent) => Promise<void>,
  ): Promise<void> {
    const message = JSON.parse(msg.content.toString() as string);

    try {
      const domainEvent = this.instanceDomainEvent(
        DomainEventInstance,
        message,
      );

      await handler(domainEvent);
    } catch (error) {
      await this.handleError(msg, message, error);
    }
  }

  private async handleError(
    msg: ConsumeMessage,
    message: any,
    error: any,
  ): Promise<void> {
    const headers = msg.properties.headers;
    const currentRetry = headers.retries || 0;

    if (this.maxRetries && currentRetry < this.maxRetries) {
      await this.retry(message, headers, msg);
    } else {
      await this.sendToDlx(
        message,
        error.message as string,
        msg.fields.routingKey as string,
      );
    }
  }
}
