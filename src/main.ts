import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { server } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = process.env.NODE_ENV;
  if (env === 'dev') {
    app.enableCors();
  } else {
    // enableCors for SPECIFIC origin only, aka the way it's supposed to be
  }
  await app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(server.port);
}
bootstrap();
