import { NestFactory } from '@nestjs/core';


import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

export const OPEN_API_ROOT = 'api/v1/docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Parking API')
    .setDescription('Api RESTful para controle de estacionamento')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Establishment')
    .addTag('Vehicles')
    .build();
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(OPEN_API_ROOT, app, document);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
