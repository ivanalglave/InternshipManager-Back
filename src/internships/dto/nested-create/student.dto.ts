import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
  IsEmail,
  IsAlphanumeric,
  IsPhoneNumber,
} from 'class-validator';
import { AddressDto } from './address.dto';

export class StudentDto {
  @IsString()
  @IsNotEmpty()
  completeName: string;

  @IsString()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: Date;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsString()
  @IsNotEmpty()
  FormationAndSpecialty: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  socialSecurityNumber: string;
}
