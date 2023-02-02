import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AddressDto {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  country: string;
}
