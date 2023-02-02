import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ required: true, type: InformationDto })
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => InformationDto)
  information: InformationDto;
}
