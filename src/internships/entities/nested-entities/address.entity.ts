export class AddressEntity {
  street: string;
  postalCode: string;
  city: string;
  country: string;

  constructor(partial: Partial<AddressEntity>) {
    Object.assign(this, partial);
  }
}
