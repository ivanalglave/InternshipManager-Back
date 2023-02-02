import config from './config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GroupsModule } from './groups/groups.module';
import { InternshipsModule } from './internships/internships.module';
import { PeopleModule } from './people/people.module';
import { LoginModule } from './login/login.module';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);

  // Swaggers doc for groups
  const groupsOptions = new DocumentBuilder()
    .setTitle('Groups documentation')
    .setDescription('API documentation for the Internship Manager application')
    .setVersion('1.0')
    .build();
  const groupsDocument = SwaggerModule.createDocument(app, groupsOptions, {
    include: [GroupsModule],
  });
  SwaggerModule.setup('api/groups', app, groupsDocument);

  // Swaggers doc for internships
  const internshipsOptions = new DocumentBuilder()
    .setTitle('Internship documentation')
    .setDescription('API documentation for the Internship Manager application')
    .setVersion('1.0')
    .build();
  const internshipsDocument = SwaggerModule.createDocument(
    app,
    internshipsOptions,
    { include: [InternshipsModule] },
  );
  SwaggerModule.setup('api/internships', app, internshipsDocument);

  // Swaggers doc for people
  const peopleOptions = new DocumentBuilder()
    .setTitle('People documentation')
    .setDescription('API documentation for the Internship Manager application')
    .setVersion('1.0')
    .build();
  const peopleDocument = SwaggerModule.createDocument(app, peopleOptions, {
    include: [PeopleModule],
  });
  SwaggerModule.setup('api/people', app, peopleDocument);

  // API welcome page
  const options = new DocumentBuilder()
    .setTitle('Internship manager API documentation')
    .setDescription('Documentation for the Internship manager API application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options, { include: [] });
  SwaggerModule.setup('api', app, document);

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
