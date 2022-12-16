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
  @IsString()
  @IsNotEmpty()
  service: string;

  @IsString()
  @IsNotEmpty()
  responsibleName: string;

  @IsString()
  @IsNotEmpty()
  responsibleEmail: string;

  @IsString()
  @IsNotEmpty()
  responsiblePhone: string;

  @IsString()
  @IsNotEmpty()
  responsibleFunction: string;

  @IsDateString()
  @IsNotEmpty()
  dateStart: Date;

  @IsDateString()
  @IsNotEmpty()
  dateEnd: Date;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
