import { Injectable } from '@nestjs/common';
import { PeopleDao } from './dao/people.dao';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { PeopleEntity } from './entities/people.entity';

@Injectable()
export class PeopleService {
  constructor(private readonly _peopleDao: PeopleDao) {}

  login = (email: string, password: string): Promise<PeopleEntity | void> =>
    this._peopleDao.login(email, password);

  findAll = (): Promise<PeopleEntity[] | void> => this._peopleDao.find();

  findOne = (id: string): Promise<PeopleEntity | void> =>
    this._peopleDao.findById(id);

  create = (people: CreatePeopleDto): Promise<PeopleEntity> =>
    this._peopleDao.save(people);

  update = (
    id: string,
    people: UpdatePeopleDto,
  ): Promise<PeopleEntity | void> =>
    this._peopleDao.findByIdAndUpdate(id, people);

  delete = (id: string): Promise<PeopleEntity | void> =>
    this._peopleDao.findByIdAndRemove(id);
}
