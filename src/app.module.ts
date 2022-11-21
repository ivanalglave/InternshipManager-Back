import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongodb } from './config';
import { PeopleModule } from './people/people.module';

@Module({
  imports: [PeopleModule, MongooseModule.forRoot(mongodb.uri)],
})
export class AppModule {}
