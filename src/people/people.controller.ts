import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { PeopleEntity } from './entities/people.entity';
import { PeopleService } from './people.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('people')
@UseInterceptors(HttpInterceptor)
export class PeopleController {
  constructor(private readonly _peopleService: PeopleService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    type: [PeopleEntity],
    description: 'People as a JSON objects list',
  })
  @Get()
  findAll(): Promise<PeopleEntity[] | void> {
    return this._peopleService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Id of the person to get',
  })
  @ApiResponse({
    status: 200,
    type: PeopleEntity,
    description: 'Person as a JSON object',
  })
  @Get(':id')
  findOne(@Param() params: { id: string }): Promise<PeopleEntity | void> {
    return this._peopleService.findOne(params.id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Person was created successfully' })
  @ApiBody({ type: CreatePeopleDto, description: 'Person as a JSON object' })
  create(@Body() createPeopleDto: CreatePeopleDto): Promise<PeopleEntity> {
    return this._peopleService.create(createPeopleDto);
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'Id of the person to update',
  })
  @Put(':id')
  @ApiResponse({ status: 200, description: 'Person was updated successfully' })
  @ApiBody({ type: UpdatePeopleDto, description: 'Person as a JSON object' })
  update(
    @Param() params: { id: string },
    @Body() updatePeopleDto: UpdatePeopleDto,
  ): Promise<PeopleEntity | void> {
    return this._peopleService.update(params.id, updatePeopleDto);
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'Id of the person to delete',
  })
  @Delete(':id')
  delete(@Param() params: { id: string }): Promise<PeopleEntity | void> {
    return this._peopleService.delete(params.id);
  }
}
