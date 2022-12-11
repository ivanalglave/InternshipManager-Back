import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CONFLICT } from 'src/shared/HttpError';
import { STATE_STUDENT_ENTERS_INTERNSHIP_INFORMATION } from 'src/shared/InternshipState';
import { CreateInternshipDto } from '../dto/create-internship.dto';
import { InternshipDto } from '../dto/internship.dto';
import { Internship } from '../schemas/internship.schema';

@Injectable()
export class InternshipDao {
  constructor(
    @InjectModel(Internship.name)
    private readonly _internshipModel: Model<Internship>,
  ) {}

  find = (): Promise<Internship[]> =>
    new Promise((resolve, reject) => {
      this._internshipModel.find({}, {}, {}, (err, value) => {
        if (err) reject(err.message);
        if (!value) reject('No values');
        resolve(value);
      });
    });

  findByStudentId = (studentId: string): Promise<Internship | void> =>
    new Promise((resolve, reject) => {
      this._internshipModel.findOne({ studentId }, {}, {}, (err, value) => {
        if (err) reject(err.message);
        if (!value) reject(new NotFoundException());
        resolve(value);
      });
    });

  save = (internship: CreateInternshipDto): Promise<Internship> =>
    new Promise((resolve, reject) => {
      // Use updateOne with `upsert: true` to only insert when no other document has the same studentId to prevent duplicata
      const decoratedInternship = this.toInternshipDtoWithTracking(internship);
      this._internshipModel.updateOne(
        { studentId: internship.studentId },
        { $setOnInsert: decoratedInternship },
        {
          upsert: true,
          runValidators: true,
        },
        (err, value) => {
          const { upsertedCount } = value;
          if (err) reject(err.message);
          if (upsertedCount === 0) reject(CONFLICT);
          resolve(decoratedInternship as Internship);
        },
      );
    });

  findByStudentIdAndUpdate = (
    studentId: string,
    internship: CreateInternshipDto,
  ): Promise<Internship | void> =>
    new Promise((resolve, reject) => {
      // Check if information modification is allowed -> current state is information input by student and updating is allowed
      const decoratedInternship = this.toInternshipDtoWithTracking(internship);
      this._internshipModel.findOneAndReplace(
        {
          studentId,
          'tracking.state': STATE_STUDENT_ENTERS_INTERNSHIP_INFORMATION,
        },
        decoratedInternship,
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
      this._internshipModel.findOneAndDelete({ studentId }, {}, (err) => {
        if (err) reject(err.message);
        resolve();
      });
    });

  toInternshipDtoWithTracking = (
    createInternshipDto: CreateInternshipDto,
  ): InternshipDto => {
    return {
      ...createInternshipDto,
      tracking: {
        state: 'state-1',
      },
    };
  };
}
