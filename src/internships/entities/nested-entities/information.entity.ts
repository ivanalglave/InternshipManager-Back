import { ApiProperty } from '@nestjs/swagger';
import { AffectationEntity } from './affectation.entity';
import { CompanyEntity } from './company.entity';
import { CompensationEntity } from './compensation.entity';
import { StudentEntity } from './student.entity';

export class InformationEntity {
  @ApiProperty()
  student: StudentEntity;
  @ApiProperty()
  company: CompanyEntity;
  @ApiProperty()
  affectation: AffectationEntity;
  @ApiProperty()
  compensation: CompensationEntity;
  @ApiProperty()
  internshipDescription: string;

  constructor(partial: Partial<InformationEntity>) {
    Object.assign(this, partial);
  }
}
