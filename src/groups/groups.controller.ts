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
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupEntity } from './entities/group.entity';
import { GroupsService } from './groups.service';
import { CreatePeopleDto } from 'src/people/dto/create-people.dto';
import { PeopleService } from 'src/people/people.service';
import { roleValue } from 'src/shared/Roles';

@Controller('groups')
@UseInterceptors(HttpInterceptor)
export class GroupsController {
  constructor(
    private readonly _groupsService: GroupsService,
    private readonly _peopleService: PeopleService,
  ) {}

  @Get()
  findAll(): Promise<GroupEntity[] | void> {
    return this._groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: { id: string }): Promise<GroupEntity | void> {
    return this._groupsService.findOne(params.id);
  }

  @Post()
  create(@Body() createGroupDto: CreateGroupDto): Promise<GroupEntity> {
    return this._groupsService.create(createGroupDto);
  }

  @Post(':id/import/:role')
  async importAsFile(
    @Param() params: { id: string; role: string },
    @Body() people: CreatePeopleDto[],
  ): Promise<GroupEntity | void> {
    const peopleEntities = await this._peopleService.createMany(
      people.map((person) => {
        person.role = roleValue(params.role);
        return person;
      }),
    );
    const peopleIds = peopleEntities.map((person) => person._id);
    return this._groupsService.updateManyByRole(
      params.id,
      params.role,
      peopleIds,
      'post',
    );
  }

  @Put(':id')
  update(
    @Param() params: { id: string },
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<GroupEntity | void> {
    return this._groupsService.update(params.id, updateGroupDto);
  }

  @Put(':id/:role')
  updateOneByRole(
    @Param() params: { id: string; role: string },
    @Body() body: { personId: string; action: string },
  ): Promise<GroupEntity | void> {
    return this._groupsService.updateOneByRole(
      params.id,
      params.role,
      body.personId,
      body.action,
    );
  }

  @Delete(':id')
  delete(@Param() params: { id: string }): Promise<GroupEntity | void> {
    return this._groupsService.delete(params.id);
  }
}
