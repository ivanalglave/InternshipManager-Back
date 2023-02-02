import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateGroupDto {
  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsOptional()
  responsibles: string[];

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsOptional()
  secretaries: string[];

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsOptional()
  students: string[];
}
