import { IsString, IsNotEmpty } from 'class-validator';

export class CompensationDto {
  @IsString()
  @IsNotEmpty()
  gratificationAmount: string;

  @IsString()
  @IsNotEmpty()
  modalities: string;

  @IsString()
  @IsNotEmpty()
  othersAdvantages: string;
}
