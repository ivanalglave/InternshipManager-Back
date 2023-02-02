import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsNotEmpty } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, type: Boolean })
  @IsBoolean()
  final: boolean;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  parent: any;
}
