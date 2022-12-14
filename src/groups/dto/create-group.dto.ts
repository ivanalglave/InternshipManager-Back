import { IsBoolean, IsString, IsNotEmpty } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  final: boolean;

  @IsString()
  @IsNotEmpty()
  parent: any;
}
