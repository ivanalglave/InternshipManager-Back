import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePeopleDto {
  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  firstname: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  lastname: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  passwordHash: string;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  role: number;
}
