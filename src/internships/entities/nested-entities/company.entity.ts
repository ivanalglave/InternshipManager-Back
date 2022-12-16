import { AddressEntity } from './address.entity';

export class CompanyEntity {
  ceoName: string;
  companyName: string;
  hrContactName: string;
  hrContactEmail: string;
  address: AddressEntity;

  constructor(partial: Partial<CompanyEntity>) {
    Object.assign(this, partial);
  }
}
