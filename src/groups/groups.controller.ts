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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupEntity } from './entities/group.entity';
import { GroupsService } from './groups.service';

@Controller('groups')
@UseInterceptors(HttpInterceptor)
export class GroupsController {
  constructor(private readonly _groupsService: GroupsService) {}

  @ApiResponse({
    isArray: true,
    type: GroupEntity,
    description: 'Groups as a JSON objects list',
  })
  @Get()
  findAll(): Promise<GroupEntity[] | void> {
    return this._groupsService.findAll();
  }

  @ApiResponse({
    status: 200,
    type: GroupEntity,
    description: 'Group as a JSON object',
  })
  @ApiParam({ name: 'id', type: String, description: 'Id of the group to get' })
  @Get(':id')
  findOne(@Param() params: { id: string }): Promise<GroupEntity | void> {
    return this._groupsService.findOne(params.id);
  }

  @ApiCreatedResponse({ description: 'Group was created successfully' })
  @ApiBody({ type: CreateGroupDto })
  @Post()
  create(@Body() createGroupDto: CreateGroupDto): Promise<GroupEntity> {
    return this._groupsService.create(createGroupDto);
  }

  @ApiResponse({ status: 200, description: 'Group was updated successfully' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Id of the group to update',
  })
  @ApiBody({ type: UpdateGroupDto })
  @Put(':id')
  update(
    @Param() params: { id: string },
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<GroupEntity | void> {
    return this._groupsService.update(params.id, updateGroupDto);
  }

  @ApiResponse({ status: 200, description: 'Group was deleted' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Id of the group to delete',
  })
  @Delete(':id')
  delete(@Param() params: { id: string }): Promise<GroupEntity | void> {
    return this._groupsService.delete(params.id);
  }
}
