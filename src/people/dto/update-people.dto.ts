import { IsOptional, IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePeopleDto {
  
  @IsString()
  @IsOptional()
  numetu: string;
  
  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  passwordHash: string;
  
  @IsOptional()
  role: number;

}
