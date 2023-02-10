import { IsOptional, IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePeopleDto {
  
  @IsNumber()
  @IsNotEmpty()
  ine: number;
  
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
