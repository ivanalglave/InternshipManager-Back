import { AddressEntity } from './address.entity';

export class AffectationEntity {
  service: string;
  responsibleName: string;
  responsibleEmail: string;
  responsiblePhone: string;
  responsibleFunction: string;
  dateStart: Date;
  dateEnd: Date;
  address: AddressEntity;

  constructor(partial: Partial<AffectationEntity>) {
    Object.assign(this, partial);
  }
}
