import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { Group } from '../schemas/group.schema';
import * as Roles from 'src/shared/Roles';

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

  findByIdAndUpdateRole = (
    id: string,
    role: string,
    personId: string,
    action: string,
  ): Promise<Group | void> =>
    new Promise((resolve, reject) => {
      let query = {};
      let queryInner = {};
      switch (role) {
        case Roles.ROLE_RESPONSIBLE:
          queryInner = { responsibles: personId };
          break;
        case Roles.ROLE_SECRETARY:
          queryInner = { secretaries: personId };
          break;
        case Roles.ROLE_STUDENT:
          queryInner = { students: personId };
          break;
        default:
          reject(new BadRequestException('Bad role'));
      }
      switch (action) {
        case 'post':
          query = { $push: queryInner };
          break;
        case 'delete':
          query = { $pull: queryInner };
          break;
        default:
          reject(new BadRequestException('Bad action'));
      }
      this._groupModel.findByIdAndUpdate(
        id,
        query,
        { new: true },
        (err, value) => {
          if (err) reject(err.message);
          resolve(value);
        },
      );
    });

  findByIdAndUpdateManyByRole = (
    id: string,
    role: string,
    peopleIds: string[],
    action: string,
  ): Promise<Group | void> =>
    new Promise((resolve, reject) => {
      let query = {};
      if (action === 'post') {
        switch (role) {
          case Roles.ROLE_RESPONSIBLE:
            query = { $addToSet: { responsibles: { $each: peopleIds } } };
            break;
          case Roles.ROLE_SECRETARY:
            query = { $addToSet: { secretaries: { $each: peopleIds } } };
            break;
          case Roles.ROLE_STUDENT:
            query = { $addToSet: { students: { $each: peopleIds } } };
            break;
          default:
            reject(new BadRequestException('Bad role'));
        }
      } else if (action === 'delete') {
        switch (role) {
          case Roles.ROLE_RESPONSIBLE:
            query = { $pull: { responsibles: { $in: peopleIds } } };
            break;
          case Roles.ROLE_SECRETARY:
            query = { $pull: { secretaries: { $in: peopleIds } } };
            break;
          case Roles.ROLE_STUDENT:
            query = { $pull: { students: { $in: peopleIds } } };
            break;
          default:
            reject(new BadRequestException('Bad role'));
        }
      } else reject(new BadRequestException('Unknown action'));
      this._groupModel.findByIdAndUpdate(
        id,
        query,
        { new: true },
        (err, value) => {
          if (err) reject(err.message);
          resolve(value);
      });
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
      this._groupModel.remove({ parent: { $regex: parent } }, (err) => {
        if (err) reject(err.message);
        resolve();
      });
    });
}
