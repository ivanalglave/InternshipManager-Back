import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { AffectationDto } from './affectation.dto';
import { CompanyDto } from './company.dto';
import { CompensationDto } from './compensation.dto';
import { StudentDto } from './student.dto';

export class InformationDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => StudentDto)
  student: StudentDto;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CompanyDto)
  company: CompanyDto;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AffectationDto)
  affectation: AffectationDto;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CompensationDto)
  compensation: CompensationDto;

  @IsString()
  @IsNotEmpty()
  internshipDescription: string;
}
