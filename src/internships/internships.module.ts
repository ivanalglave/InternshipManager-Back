import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InternshipDao } from './dao/internships.dao';
import { InternshipsController } from './internships.controller';
import { InternshipService } from './internships.service';
import { Internship, InternshipSchema } from './schemas/internship.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Internship.name, schema: InternshipSchema },
    ]),
  ],
  controllers: [InternshipsController],
  providers: [InternshipService, InternshipDao, Logger],
  exports: [InternshipService],
})
export class InternshipsModule {}
