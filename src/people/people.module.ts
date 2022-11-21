import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeopleDao } from './dao/people.dao';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { People, PeopleSchema } from './schemas/people.schema';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: People.name, schema: PeopleSchema }]),
    ],
    controllers: [PeopleController],
    providers: [PeopleService, PeopleDao, Logger],
  })

  export class PeopleModule {}