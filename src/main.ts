import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, NestApplicationOptions } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { noop } from 'rxjs';

import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const appOptions: NestApplicationOptions = {
    cors: true,
  };
  const configDocumentBuilder = new DocumentBuilder()
    .setTitle('Blog UI')
    .setDescription('The Blog UI API description')
    .setVersion('1.0')
    .addTag('Blog')
    .build();

  const app = await NestFactory.create(AppModule, appOptions);
  const config = app.get(ConfigService) as ConfigService;

  app.useGlobalPipes(new ValidationPipe({}));
  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, configDocumentBuilder);
  SwaggerModule.setup('/docs', app, document, );

  await app.listen(config.get('port'));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap().then(noop);
