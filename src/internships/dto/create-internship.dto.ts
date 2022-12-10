import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { InformationDto } from './nested-create/information.dto';

export class CreateInternshipDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => InformationDto)
  information: InformationDto;
}
