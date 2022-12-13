import { AddressEntity } from './address.entity';

export class StudentEntity {
  completeName: string;
  phone: string;
  birthDate: Date;
  address: AddressEntity;
  FormationAndSpecialty: string;
  email: string;
  socialSecurityNumber: string;

  constructor(partial: Partial<StudentEntity>) {
    Object.assign(this, partial);
  }
}
