import { People } from '../schemas/people.schema';

export class PeopleEntity {
  _id: string;
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  passwordHash: string;
  role: number;

  constructor(partial: Partial<People>) {
    Object.assign(this, partial);
  }
}