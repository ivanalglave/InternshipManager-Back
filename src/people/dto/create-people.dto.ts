import { IsBoolean, IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreatePeopleDto {

  @IsNumber()
  @IsNotEmpty()
  numetu: number;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsOptional()
  passwordHash: string;

  @IsString()
  @IsNotEmpty()
  email: string;
 
  @IsOptional()
  role: number;
}
