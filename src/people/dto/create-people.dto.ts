import { IsBoolean, IsString, IsNotEmpty } from 'class-validator';

export class CreatePeopleDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  passwordHash: string;
  
  @IsNotEmpty()
  role: number;

}