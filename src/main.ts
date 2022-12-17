import config from './config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);
  if (env === 'dev') {
    app.enableCors();
  } else if (env === 'prod') {
    // enableCors for SPECIFIC origin only, aka the way it's supposed to be
  } else {
    // unknown environement ?
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
