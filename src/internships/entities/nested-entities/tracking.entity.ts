import { ApiProperty } from '@nestjs/swagger';

export class TrackingEntity {
  @ApiProperty()
  state: string;
  @ApiProperty()
  studentEntersInternshipInformation?: boolean;
  @ApiProperty()
  responsibleAcceptsInternshipInformation?: boolean;
  @ApiProperty()
  secretaryEstablishesInternshipAgreement?: string;
  @ApiProperty()
  studentSignsInternshipAgreement?: string;
  @ApiProperty()
  responsibleSignsInternshipAgreement?: string;
  @ApiProperty()
  companySignsInternshipAgreement?: string;
  @ApiProperty()
  deanSignsInternshipAgreement?: string;

  constructor(partial: Partial<TrackingEntity>) {
    Object.assign(this, partial);
  }
}
