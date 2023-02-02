import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ required: true, type: StudentDto })
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => StudentDto)
  student: StudentDto;

  @ApiProperty({ required: true, type: CompanyDto })
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CompanyDto)
  company: CompanyDto;

  @ApiProperty({ required: true, type: AffectationDto })
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AffectationDto)
  affectation: AffectationDto;

  @ApiProperty({ required: true, type: CompensationDto })
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CompensationDto)
  compensation: CompensationDto;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  internshipDescription: string;
}
