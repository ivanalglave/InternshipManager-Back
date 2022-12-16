import { Injectable } from '@nestjs/common';
import { InternshipDao } from './dao/internships.dao';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { InternshipEntity } from './entities/internship.entity';

@Injectable()
export class InternshipService {
  constructor(private readonly _internshipsDao: InternshipDao) {}

  findAll = (): Promise<InternshipEntity[] | void> =>
    this._internshipsDao.find();

  findOne = (studentId: string): Promise<InternshipEntity | void> =>
    this._internshipsDao.findByStudentId(studentId);

  create = (internship: CreateInternshipDto): Promise<InternshipEntity> =>
    this._internshipsDao.save(internship);

  update = (
    studentId: string,
    internship: CreateInternshipDto,
  ): Promise<InternshipEntity | void> =>
    this._internshipsDao.findByStudentIdAndUpdate(studentId, internship);

  updateTracking = (
    studentId: string,
    state: string,
    content: string | boolean,
  ): Promise<InternshipEntity | void> =>
    this._internshipsDao.findByStudentIdAndUpdateTracking(
      studentId,
      state,
      content,
    );

  delete = (studentId: string): Promise<InternshipEntity | void> =>
    this._internshipsDao.findByStudentIdAndRemove(studentId);
}
