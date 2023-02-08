import { Injectable } from '@nestjs/common';
import { GroupsDao } from './dao/groups.dao';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupEntity } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(private readonly _groupsDao: GroupsDao) {}

  findAll = (): Promise<GroupEntity[] | void> => this._groupsDao.find();

  findOne = (id: string): Promise<GroupEntity | void> =>
    this._groupsDao.findById(id);

  create = (group: CreateGroupDto): Promise<GroupEntity> =>
    this._groupsDao.save(group);

  update = (id: string, group: UpdateGroupDto): Promise<GroupEntity | void> =>
    this._groupsDao.findByIdAndUpdate(id, group);

  updateOneByRole = (
    id: string,
    role: string,
    personId: string,
    action: string,
  ): Promise<GroupEntity | void> =>
    this._groupsDao.findByIdAndUpdateRole(id, role, personId, action);

  delete(id: string): Promise<GroupEntity | void> {
    return this._groupsDao.findById(id).then((res) => {
      if (res) {
        const parent = res.parent + '-' + res.name;
        this._groupsDao.findByIdAndRemove(id).then(() => {
          this._groupsDao.findByParentAndRemove(parent);
        });
      }
    });
  }
}
