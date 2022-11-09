import { IsBoolean, IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsBoolean()
  final: boolean;

  @IsMongoId()
  @IsNotEmpty()
  parent: any;
}
