import { IsString, IsNotEmpty } from 'class-validator';

export class TrackingDto {
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
