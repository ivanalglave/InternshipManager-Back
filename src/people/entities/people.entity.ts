import { People } from '../schemas/people.schema';

export class PeopleEntity {
    
  constructor(partial: Partial<People>) {
    Object.assign(this, partial);
  }
}