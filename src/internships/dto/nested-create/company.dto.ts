import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from './address.dto';

export class CompanyDto {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  ceoName: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  hrContactName: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  hrContactEmail: string;

  @ApiProperty({ required: true, type: AddressDto })
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
