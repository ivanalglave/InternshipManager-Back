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

@Controller('groups')
@UseInterceptors(HttpInterceptor)
export class GroupsController {
  constructor(private readonly _groupsService: GroupsService) {}

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

  @Put(':id')
  update(
    @Param() params: { id: string },
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<GroupEntity | void> {
    return this._groupsService.update(params.id, updateGroupDto);
  }

  @Delete(':id')
  delete(@Param() params: { id: string }): Promise<GroupEntity | void> {
    return this._groupsService.delete(params.id);
  }
}
