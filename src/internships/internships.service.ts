import { Injectable } from '@nestjs/common';
import { InternshipDao } from './dao/internships.dao';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { InternshipDto } from './dto/internship.dto';
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
    internship: InternshipDto,
  ): Promise<InternshipEntity | void> =>
    this._internshipsDao.findByStudentIdAndUpdate(studentId, internship);

  delete = (studentId: string): Promise<InternshipEntity | void> =>
    this._internshipsDao.findByStudentIdAndRemove(studentId);
}