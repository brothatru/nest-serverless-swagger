import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Callback, Context, Handler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { Server } from 'http';
import { AppModule } from './app.module';

const express = require('express');

const binaryMimeTypes: string[] = [];

let cachedServer: Server;

process.on('unhandledRejection', (reason) => {
  console.error(reason);
});

process.on('uncaughtException', (reason) => {
  console.error(reason);
});

/**
 * Enable Swagger
 *
 * @see https://javascript.plainenglish.io/serverless-nestjs-document-your-api-with-swagger-and-aws-api-gateway-64a53962e8a2
 */
function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('My REST API Description')
    .setVersion('1.0.0')
    .addTag('Api Tag')
    /**
     * To make swagger "Try it out" to work
     * @see https://github.com/nestjs/swagger/issues/448#issuecomment-596567651
     */
    .addServer('/dev')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap(): Promise<Server> {
  if (!cachedServer) {
    try {
      const expressApp = express();
      const nestApp = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressApp),
      );
      nestApp.use(eventContext());
      setupSwagger(nestApp);
      await nestApp.init();
      cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  return cachedServer;
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  if (event.path === '/api') {
    event.path = '/api/';
  }
  event.path = event.path.includes('swagger-ui')
    ? `/api${event.path}`
    : event.path;

  cachedServer = await bootstrap();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
