import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongodb } from './config';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [GroupsModule, MongooseModule.forRoot(mongodb.uri)],
})
export class AppModule {}
