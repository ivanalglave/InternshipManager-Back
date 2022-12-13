export class TrackingEntity {
  state: string;
  studentEntersInternshipInformation?: boolean;
  responsibleAcceptsInternshipInformation?: boolean;
  secretaryEstablishesInternshipAgreement?: string;
  studentSignsInternshipAgreement?: string;
  responsibleSignsInternshipAgreement?: string;
  companySignsInternshipAgreement?: string;
  deanSignsInternshipAgreement?: string;

  constructor(partial: Partial<TrackingEntity>) {
    Object.assign(this, partial);
  }
}
