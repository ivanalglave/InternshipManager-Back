import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupsDao } from 'src/groups/dao/groups.dao';
import { GroupsService } from 'src/groups/groups.service';
import { Group, GroupSchema } from 'src/groups/schemas/group.schema';
import { InternshipDao } from 'src/internships/dao/internships.dao';
import { InternshipService } from 'src/internships/internships.service';
import { Internship, InternshipSchema } from 'src/internships/schemas/internship.schema';
import { PeopleDao } from './dao/people.dao';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { People, PeopleSchema } from './schemas/people.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: People.name, schema: PeopleSchema }]),
    MongooseModule.forFeature([{ name: Internship.name, schema: InternshipSchema }]),
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  controllers: [PeopleController],
  providers: [PeopleService, PeopleDao, Logger, InternshipService, GroupsService, InternshipDao, GroupsDao],
  exports: [PeopleService],
})
export class PeopleModule {}
