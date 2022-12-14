import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { Group } from '../schemas/group.schema';

@Injectable()
export class GroupsDao {
  constructor(
    @InjectModel(Group.name)
    private readonly _groupModel: Model<Group>,
  ) {}

  find = (): Promise<Group[]> =>
    new Promise((resolve, reject) => {
      this._groupModel.find({}, {}, {}, (err, value) => {
        if (err) reject(err.message);
        if (!value) reject('No values');
        resolve(value);
      });
    });

  findById = (id: string): Promise<Group | void> =>
    new Promise((resolve, reject) => {
      this._groupModel.findById(id, {}, {}, (err, value) => {
        if (err) reject(err.message);
        if (!value) reject(new NotFoundException());
        resolve(value);
      });
    });

  save = (group: CreateGroupDto): Promise<Group> =>
    new Promise((resolve, reject) => {
      new this._groupModel(group).save((err, value) => {
        if (err) reject(err.message);
        if (!value) reject(new InternalServerErrorException());
        resolve(value);
      });
    });

  findByIdAndUpdate = (
    id: string,
    group: UpdateGroupDto,
  ): Promise<Group | void> =>
    new Promise((resolve, reject) => {
      this._groupModel.findByIdAndUpdate(
        id,
        group,
        {
          new: true,
          runValidators: true,
        },
        (err, value) => {
          if (err) reject(err.message);
          resolve(value);
        },
      );
    });

  findByIdAndRemove = (id: string): Promise<Group | void> =>
    new Promise((resolve, reject) => {
      this._groupModel.findByIdAndDelete(id, {}, (err) => {
        if (err) reject(err.message);
        resolve();
      });
    });

  findByParentAndRemove = (parent: string): Promise<Group | void> =>
    new Promise((resolve, reject) => {
      this._groupModel.remove({parent : {$regex : parent}}, (err) => {
        if (err) reject(err.message);
        resolve();
      });
    });
}
