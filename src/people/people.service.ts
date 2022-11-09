import {
    Injectable,
    UnprocessableEntityException,
    NotFoundException,
    ConflictException,
  } from '@nestjs/common';
  import {
    Observable,
    of,
    filter,
    map,
    mergeMap,
    defaultIfEmpty,
    catchError,
    throwError,
  } from 'rxjs';
import { PeopleDao } from './dao/people.dao';
//    import { HttpInterceptor } from '../interceptors/http.interceptor';
//   import { CreatePeopleDto } from './dto/create-people.dto';
//   import { UpdatePeopleDto } from './dto/update-people.dto';
import { PeopleEntity } from './entities/people.entity';

  
  @Injectable()
  export class PeopleService {
    constructor(private readonly _peopleDao: PeopleDao) {}
  
    findAll = (): Observable<PeopleEntity[] | void> =>
      this._peopleDao.find().pipe(
        filter(Boolean),
        map((people) => (people || []).map((person) => new PeopleEntity(person))),
        defaultIfEmpty(undefined),
      );
}