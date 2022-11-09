import { IsBoolean, IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class UpdateGroupDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsBoolean()
  final: boolean;

  @IsMongoId()
  @IsNotEmpty()
  parent: string;
}
