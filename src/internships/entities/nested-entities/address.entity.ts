import { ApiProperty } from '@nestjs/swagger';

export class AddressEntity {
  @ApiProperty()
  street: string;
  @ApiProperty()
  postalCode: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  country: string;

  constructor(partial: Partial<AddressEntity>) {
    Object.assign(this, partial);
  }
}
