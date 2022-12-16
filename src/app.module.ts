import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongodb } from './config';
import { PeopleModule } from './people/people.module';
import { GroupsModule } from './groups/groups.module';
import { LoginModule } from './login/login.module';


@Module({
  imports: [PeopleModule, GroupsModule, MongooseModule.forRoot(mongodb.uri), LoginModule],
})
export class AppModule {}
