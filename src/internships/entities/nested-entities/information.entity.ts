import { AffectationEntity } from './affectation.entity';
import { CompanyEntity } from './company.entity';
import { CompensationEntity } from './compensation.entity';
import { StudentEntity } from './student.entity';

export class InformationEntity {
  student: StudentEntity;
  company: CompanyEntity;
  affectation: AffectationEntity;
  compensation: CompensationEntity;
  internshipDescription: string;

  constructor(partial: Partial<InformationEntity>) {
    Object.assign(this, partial);
  }
}
