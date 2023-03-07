import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeopleDao } from './dao/people.dao';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { People, PeopleSchema } from './schemas/people.schema';
import { Internship, InternshipSchema } from 'src/internships/schemas/internship.schema';
import { InternshipDao } from 'src/internships/dao/internships.dao';
import { InternshipService } from 'src/internships/internships.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: People.name, schema: PeopleSchema }]),
    MongooseModule.forFeature([{ name: Internship.name, schema: InternshipSchema }]),
  ],
  controllers: [PeopleController],
  providers: [PeopleService, PeopleDao, InternshipService, InternshipDao, Logger],
  exports: [PeopleService],
})
export class PeopleModule {}
