import { Group } from '../schemas/group.schema';

export class GroupEntity {
  _id: string;
  id: string;
  final: boolean;
  responsibles: string[];
  secretaries: string[];
  students: string[];
  parent: string;

  constructor(partial: Partial<Group>) {
    Object.assign(this, partial);
  }
}
