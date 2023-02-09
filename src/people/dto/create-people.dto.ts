import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePeopleDto {
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
