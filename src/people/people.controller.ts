import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseInterceptors,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
//    import { HttpInterceptor } from '../interceptors/http.interceptor';
//   import { CreatePeopleDto } from './dto/create-people.dto';
//   import { UpdatePeopleDto } from './dto/update-people.dto';
  import { PeopleEntity } from './entities/people.entity';
  import { PeopleService } from './people.service';
  

  @Controller('people')
//   @UseInterceptors(HttpInterceptor)
  export class PeopleController {
    constructor(private readonly _peopleService: PeopleService) {}
  
    @Get()
    findAll(): Observable<PeopleEntity[] | void> {
      return this._peopleService.findAll();
    }
  
  }