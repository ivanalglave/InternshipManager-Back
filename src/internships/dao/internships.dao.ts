import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BAD_REQUEST, CONFLICT } from 'src/shared/HttpError';
import {
  isStateValid,
  STATE_COMPANY_SIGNS_INTERNSHIP_AGREEMENT,
  STATE_DEAN_SIGNS_INTERNSHIP_AGREEMENT,
  STATE_RESPONSIBLE_ACCEPTS_INTERNSHIP_INFORMATION,
  STATE_RESPONSIBLE_SIGNS_INTERNSHIP_AGREEMENT,
  STATE_SECRETARY_ESTABLISHES_INTERNSHIP_AGREEMENT,
  STATE_STUDENT_ENTERS_INTERNSHIP_INFORMATION,
  STATE_STUDENT_SIGNS_INTERNSHIP_AGREEMENT,
} from 'src/shared/InternshipState';
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
      if (studentId !== internship.studentId) reject(BAD_REQUEST);
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
          // if (typeof value !== typeof Internship) reject(INTERNAL);
          resolve(value as Internship);
        },
      );
    });

  private updateTrackingState = (
    studentId: string,
    state: string,
    nextState: string,
    contentHolder: string,
    content: string | boolean,
    callback: (err: any, value: any) => void,
  ) => {
    this._internshipModel.findOneAndUpdate(
      {
        studentId,
        'tracking.state': state,
      },
      {
        $set: {
          'tracking.state': nextState,
          [contentHolder]: content,
        },
      },
      {
        new: true,
        runValidators: true,
      },
      callback,
    );
  };

  findByStudentIdAndUpdateTracking = (
    studentId: string,
    state: string,
    content: string | boolean,
  ): Promise<Internship | void> =>
    new Promise((resolve, reject) => {
      // console.log('%s/%s: {%s}', studentId, state, content);
      if (!isStateValid(state)) reject(BAD_REQUEST);
      console.log(content);
      let nextState: string, contentHolder: string;
      let valid = false;
      switch (state) {
        case STATE_STUDENT_ENTERS_INTERNSHIP_INFORMATION: {
          if (typeof content === 'boolean' && content === true) {
            nextState = STATE_RESPONSIBLE_ACCEPTS_INTERNSHIP_INFORMATION;
            contentHolder = 'tracking.studentEntersInternshipInformation';
            valid = true;
          } else reject(BAD_REQUEST);
          break;
        }
        case STATE_RESPONSIBLE_ACCEPTS_INTERNSHIP_INFORMATION: {
          if (typeof content === 'boolean' && content === true) {
            // content === true -> Responsible agrees with internship
            nextState = STATE_SECRETARY_ESTABLISHES_INTERNSHIP_AGREEMENT;
            contentHolder = 'tracking.responsibleAcceptsInternshipInformation';
            valid = true;
          } else if (typeof content === 'boolean' && content === false) {
            // content === false -> Responsible did not agree with internship, go back to student entering information
            nextState = STATE_STUDENT_ENTERS_INTERNSHIP_INFORMATION;
            contentHolder = 'tracking.responsibleAcceptsInternshipInformation';
            valid = true;
          } else reject(BAD_REQUEST);
          break;
        }
        case STATE_SECRETARY_ESTABLISHES_INTERNSHIP_AGREEMENT: {
          if (typeof content !== 'string') reject(BAD_REQUEST);
          else {
            nextState = STATE_STUDENT_SIGNS_INTERNSHIP_AGREEMENT;
            contentHolder = 'tracking.secretaryEstablishesInternshipAgreement';
            valid = true;
          }
          break;
        }
        case STATE_STUDENT_SIGNS_INTERNSHIP_AGREEMENT: {
          if (typeof content !== 'string') reject(BAD_REQUEST);
          else {
            nextState = STATE_RESPONSIBLE_SIGNS_INTERNSHIP_AGREEMENT;
            contentHolder = 'tracking.studentSignsInternshipAgreement';
            valid = true;
          }
          break;
        }
        case STATE_RESPONSIBLE_SIGNS_INTERNSHIP_AGREEMENT: {
          if (typeof content !== 'string') reject(BAD_REQUEST);
          else {
            nextState = STATE_COMPANY_SIGNS_INTERNSHIP_AGREEMENT;
            contentHolder = 'tracking.responsibleSignsInternshipAgreement';
            valid = true;
          }
          break;
        }
        case STATE_COMPANY_SIGNS_INTERNSHIP_AGREEMENT: {
          if (typeof content !== 'string') reject(BAD_REQUEST);
          else {
            nextState = STATE_DEAN_SIGNS_INTERNSHIP_AGREEMENT;
            contentHolder = 'tracking.companySignsInternshipAgreement';
            valid = true;
          }
          break;
        }
        case STATE_DEAN_SIGNS_INTERNSHIP_AGREEMENT: {
          if (typeof content !== 'string') reject(BAD_REQUEST);
          else {
            nextState = '/';
            contentHolder = 'tracking.deanSignsInternshipAgreement';
            valid = true;
          }
          break;
        }
      }
      if (valid) {
        this.updateTrackingState(
          studentId,
          state,
          nextState,
          contentHolder,
          content,
          (err, value) => {
            if (err) reject(err);
            else if (!value) reject(BAD_REQUEST);
            else resolve(value);
          },
        );
      }
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
        state: STATE_STUDENT_ENTERS_INTERNSHIP_INFORMATION,
      },
    };
  };
}
