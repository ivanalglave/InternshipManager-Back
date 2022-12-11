import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config';
import { PeopleModule } from './people/people.module';
import { GroupsModule } from './groups/groups.module';
import { InternshipsModule } from './internships/internships.module';

@Module({
  imports: [
    PeopleModule,
    GroupsModule,
    InternshipsModule,
    MongooseModule.forRoot(config.mongodb.uri),
  ],
})
export class AppModule {}
