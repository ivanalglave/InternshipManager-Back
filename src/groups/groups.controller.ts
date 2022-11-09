import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupEntity } from './entities/group.entity';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly _groupsService: GroupsService) {}

  @Get()
  findAll(): Observable<GroupEntity[] | void> {
    return this._groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: { id: string }): Observable<GroupEntity> {
    return this._groupsService.findOne(params.id);
  }

  @Post()
  create(@Body() createGroupDto: CreateGroupDto): Observable<GroupEntity> {
    return this._groupsService.create(createGroupDto);
  }

  @Put(':id')
  update(
    @Param() params: { id: string },
    @Body() updateGroupDto: UpdateGroupDto,
  ): Observable<GroupEntity> {
    return this._groupsService.update(params.id, updateGroupDto);
  }

  @Delete(':id')
  delete(@Param() params: { id: string }): Observable<void> {
    return this._groupsService.delete(params.id);
  }
}
