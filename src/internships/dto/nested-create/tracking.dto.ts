import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class TrackingDto {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ required: false, type: String })
  @IsBoolean()
  @IsOptional()
  studentEntersInternshipInformation?: boolean;

  @ApiProperty({ required: false, type: String })
  @IsBoolean()
  @IsOptional()
  responsibleAcceptsInternshipInformation?: boolean;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  secretaryEstablishesInternshipAgreement?: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  studentSignsInternshipAgreement?: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  responsibleSignsInternshipAgreement?: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  companySignsInternshipAgreement?: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  deanSignsInternshipAgreement?: string;
}
