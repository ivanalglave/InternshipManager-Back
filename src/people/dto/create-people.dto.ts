import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePeopleDto {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  passwordHash: string;

  @ApiProperty({ required: true, type: String, pattern: 'email@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, type: Number })
  @IsNotEmpty()
  role: number;
}
