import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeopleDao } from 'src/people/dao/people.dao';
import { PeopleService } from 'src/people/people.service';
import { People, PeopleSchema } from 'src/people/schemas/people.schema';
import { GroupsDao } from './dao/groups.dao';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { Group, GroupSchema } from './schemas/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    MongooseModule.forFeature([{ name: People.name, schema: PeopleSchema }]),
  ],
  controllers: [GroupsController],
  providers: [GroupsService, GroupsDao, Logger, PeopleService, PeopleDao],
})
export class GroupsModule {}
