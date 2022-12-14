import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UseGuards
} from '@nestjs/common';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { HttpInterceptor } from '../interceptors/http.interceptor';
//   import { CreatePeopleDto } from './dto/create-people.dto';
//   import { UpdatePeopleDto } from './dto/update-people.dto';
import { PeopleEntity } from './entities/people.entity';
import { PeopleService } from './people.service';
import { AuthGuard } from '@nestjs/passport';

 interface Login {
  email: string;
  password: string;
}

@Controller('people')
@UseInterceptors(HttpInterceptor)
export class PeopleController {
  constructor(private readonly _peopleService: PeopleService) {}


  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<PeopleEntity[] | void> {
    return this._peopleService.findAll();
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param() params: { id: string }): Promise<PeopleEntity | void> {
    return this._peopleService.findOne(params.id);
  }

  @Post()
  create(@Body() createPeopleDto: CreatePeopleDto): Promise<PeopleEntity> {
    return this._peopleService.create(createPeopleDto);
  }

  @Put(':id')
  update(
    @Param() params: { id: string },
    @Body() updateGroupDto: UpdatePeopleDto,
  ): Promise<PeopleEntity | void> {
    return this._peopleService.update(params.id, updateGroupDto);
  }

  @Delete(':id')
  delete(@Param() params: { id: string }): Promise<PeopleEntity | void> {
    return this._peopleService.delete(params.id);
  }
}
