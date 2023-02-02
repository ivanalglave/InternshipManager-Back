import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from './address.dto';

export class AffectationDto {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  service: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  responsibleName: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  responsibleEmail: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  responsiblePhone: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  responsibleFunction: string;

  @ApiProperty({ required: true, type: String })
  @IsDateString()
  @IsNotEmpty()
  dateStart: Date;

  @ApiProperty({ required: true, type: String })
  @IsDateString()
  @IsNotEmpty()
  dateEnd: Date;

  @ApiProperty({ required: true, type: AddressDto })
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
