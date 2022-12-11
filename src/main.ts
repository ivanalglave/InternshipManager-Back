import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { exit } from 'process';
import { AppModule } from './app.module';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = process.env.NODE_ENV;
  if (env === 'dev') {
    app.enableCors();
  } else if (env === 'prod') {
    // enableCors for SPECIFIC origin only, aka the way it's supposed to be
  } else {
    console.log(
      '\x1b[31mFATAL: Invalid application environment.\nDid you read the \x1b[4mREADME\x1b[0m\x1b[31m ?\x1b[0m',
    );
    exit(-1);
  }
  await app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(config.server.port);
}
bootstrap();
