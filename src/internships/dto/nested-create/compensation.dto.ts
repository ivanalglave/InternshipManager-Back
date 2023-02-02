import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CompensationDto {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  gratificationAmount: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  modalities: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  othersAdvantages: string;
}
