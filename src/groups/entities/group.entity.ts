import { ApiProperty } from '@nestjs/swagger';
import { Group } from '../schemas/group.schema';

export class GroupEntity {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  final: boolean;
  @ApiProperty()
  responsibles: string[];
  @ApiProperty()
  secretaries: string[];
  @ApiProperty()
  students: string[];
  @ApiProperty()
  parent: string;

  constructor(partial: Partial<Group>) {
    Object.assign(this, partial);
  }
}
