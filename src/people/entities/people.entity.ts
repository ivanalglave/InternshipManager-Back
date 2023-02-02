import { ApiProperty } from '@nestjs/swagger';
import { People } from '../schemas/people.schema';

export class PeopleEntity {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  passwordHash: string;
  @ApiProperty()
  role: number;

  constructor(partial: Partial<People>) {
    Object.assign(this, partial);
  }
}
