import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from './address.entity';

export class AffectationEntity {
  @ApiProperty()
  service: string;
  @ApiProperty()
  responsibleName: string;
  @ApiProperty()
  responsibleEmail: string;
  @ApiProperty()
  responsiblePhone: string;
  @ApiProperty()
  responsibleFunction: string;
  @ApiProperty()
  dateStart: Date;
  @ApiProperty()
  dateEnd: Date;
  @ApiProperty()
  address: AddressEntity;

  constructor(partial: Partial<AffectationEntity>) {
    Object.assign(this, partial);
  }
}
