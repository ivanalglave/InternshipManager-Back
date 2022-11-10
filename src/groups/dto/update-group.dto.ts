import { IsArray, IsOptional } from 'class-validator';

export class UpdateGroupDto {
  @IsArray()
  @IsOptional()
  responsibles: string[];

  @IsArray()
  @IsOptional()
  secretaries: string[];

  @IsArray()
  @IsOptional()
  students: string[];
}
