import { IsString, IsNotEmpty } from 'class-validator';

export class TrackingDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  state: string;
}
