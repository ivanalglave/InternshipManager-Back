import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInternshipDto } from '../dto/create-internship.dto';
import { InternshipDto } from '../dto/internship.dto';
import { TrackingDto } from '../dto/nested-create/tracking.dto';
import { Internship } from '../schemas/internship.schema';

@Injectable()
export class InternshipDao {
  constructor(
    @InjectModel(Internship.name)
    private readonly _groupModel: Model<Internship>,
  ) {}

  find = (): Promise<Internship[]> =>
    new Promise((resolve, reject) => {
      this._groupModel.find({}, {}, {}, (err, value) => {
        if (err) reject(err.message);
        if (!value) reject('No values');
        resolve(value);
      });
    });

  findByStudentId = (studentId: string): Promise<Internship | void> =>
    new Promise((resolve, reject) => {
      this._groupModel.findOne({ studentId }, {}, {}, (err, value) => {
        if (err) reject(err.message);
        if (!value) reject(new NotFoundException());
        resolve(value);
      });
    });

  save = (internship: CreateInternshipDto): Promise<Internship> =>
    new Promise((resolve, reject) => {
      // do smth
      const _internship: InternshipDto = {
        ...internship,
        tracking: {
          state: 'state-1',
          status: 'pending',
        },
      };
      new this._groupModel(_internship).save((err, value) => {
        if (err) reject(err.message);
        if (!value) reject(new InternalServerErrorException());
        resolve(value);
      });
    });

  findByStudentIdAndUpdate = (
    studentId: string,
    internship: InternshipDto,
  ): Promise<Internship | void> =>
    new Promise((resolve, reject) => {
      this._groupModel.findOneAndReplace(
        { studentId },
        internship,
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

  findByStudentIdAndRemove = (studentId: string): Promise<Internship | void> =>
    new Promise((resolve, reject) => {
      this._groupModel.findOneAndDelete({ studentId }, {}, (err) => {
        if (err) reject(err.message);
        resolve();
      });
    });
}
