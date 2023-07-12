import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    cors: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose']
  });
  const port = process.env.PORT || 3000;
  const globalPrefix = 'api/v1';

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  await setupSwagger(app);
  await app.listen(port, '0.0.0.0');

  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

async function setupSwagger(app: NestFastifyApplication) {
  const options = new DocumentBuilder().setTitle('Metrikube API').setDescription('API').setVersion(process.env.npm_package_version).build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}

bootstrap();
