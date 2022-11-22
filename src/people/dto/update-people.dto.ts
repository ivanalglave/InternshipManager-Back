import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdatePeopleDto {
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