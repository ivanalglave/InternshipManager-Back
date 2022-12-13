import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { InformationDto } from './nested-create/information.dto';
import { TrackingDto } from './nested-create/tracking.dto';

export class InternshipDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => InformationDto)
  information: InformationDto;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => TrackingDto)
  tracking: TrackingDto;
}
