export class CompensationEntity {
  gratificationAmount: string;
  modalities: string;
  othersAdvantages: string;

  constructor(partial: Partial<CompensationEntity>) {
    Object.assign(this, partial);
  }
}
