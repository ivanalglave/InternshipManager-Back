import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongodb } from './config';
import { PeopleModule } from './people/people.module';

@Module({
  imports: [MongooseModule.forRoot(mongodb.uri), AppModule, PeopleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
