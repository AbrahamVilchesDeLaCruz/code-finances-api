import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swaggerConfig(app);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

const swaggerConfig = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('CODE FINANCES API')
    .setDescription('Code finances api documentation')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter your Bearer token here',
    })
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
