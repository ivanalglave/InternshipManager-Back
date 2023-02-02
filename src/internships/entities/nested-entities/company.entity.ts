import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from './address.entity';

export class CompanyEntity {
  @ApiProperty()
  ceoName: string;
  @ApiProperty()
  companyName: string;
  @ApiProperty()
  hrContactName: string;
  @ApiProperty()
  hrContactEmail: string;
  @ApiProperty()
  address: AddressEntity;

  constructor(partial: Partial<CompanyEntity>) {
    Object.assign(this, partial);
  }
}
