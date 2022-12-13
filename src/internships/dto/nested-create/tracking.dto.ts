import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class TrackingDto {
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsBoolean()
  @IsOptional()
  studentEntersInternshipInformation?: boolean;

  @IsBoolean()
  @IsOptional()
  responsibleAcceptsInternshipInformation?: boolean;

  @IsString()
  @IsOptional()
  secretaryEstablishesInternshipAgreement?: string;

  @IsString()
  @IsOptional()
  studentSignsInternshipAgreement?: string;

  @IsString()
  @IsOptional()
  responsibleSignsInternshipAgreement?: string;

  @IsString()
  @IsOptional()
  companySignsInternshipAgreement?: string;

  @IsString()
  @IsOptional()
  deanSignsInternshipAgreement?: string;
}
