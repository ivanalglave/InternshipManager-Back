import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
/*import { CreatePeopleDto } from '../dto/create-people.dto';
import { UpdatePeopleDto } from '../dto/update-people.dto';*/
import { People } from '../schemas/people.schema';

@Injectable()
export class PeopleDao {
  constructor(
    @InjectModel(People.name)
    private readonly _groupModel: Model<People>,
  ) {}

  find = (): Observable<People[]> =>
    from(this._groupModel.find({})).pipe(map((people) => [].concat(people)));

}