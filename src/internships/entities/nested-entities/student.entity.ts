import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from './address.entity';

export class StudentEntity {
  @ApiProperty()
  completeName: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  birthDate: Date;
  @ApiProperty()
  address: AddressEntity;
  @ApiProperty()
  FormationAndSpecialty: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  socialSecurityNumber: string;

  constructor(partial: Partial<StudentEntity>) {
    Object.assign(this, partial);
  }
}
