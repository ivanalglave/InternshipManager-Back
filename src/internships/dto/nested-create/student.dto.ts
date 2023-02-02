import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  completeName: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ required: true, type: Date })
  @IsDateString()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty({ required: true, type: AddressDto })
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  FormationAndSpecialty: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  socialSecurityNumber: string;
}
