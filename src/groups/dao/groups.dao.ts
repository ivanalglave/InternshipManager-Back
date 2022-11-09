import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { Group } from '../schemas/group.schema';

@Injectable()
export class GroupsDao {
  constructor(
    @InjectModel(Group.name)
    private readonly _groupModel: Model<Group>,
  ) {}

  find = (): Observable<Group[]> =>
    from(this._groupModel.find({})).pipe(map((groups) => [].concat(groups)));

  findById = (id: string): Observable<Group | void> =>
    from(this._groupModel.findById(id));

  save = (group: CreateGroupDto): Observable<Group> =>
    from(new this._groupModel(group).save());

  findByIdAndUpdate = (
    id: string,
    group: UpdateGroupDto,
  ): Observable<Group | void> =>
    from(
      this._groupModel.findByIdAndUpdate(id, group, {
        new: true,
        runValidators: true,
      }),
    );

  findByIdAndRemove = (id: string): Observable<Group | void> =>
    from(this._groupModel.findByIdAndRemove(id));
}
