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
import { BAD_TRACKING_STATE, CUSTOM } from 'src/shared/HttpError';
import * as InternshipStates from 'src/shared/InternshipState';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { InternshipEntity } from './entities/internship.entity';
import { InternshipService } from './internships.service';

@Controller('internships')
@UseInterceptors(HttpInterceptor)
export class InternshipsController {
  constructor(private readonly _groupsService: InternshipService) {}

  @Get()
  findAll(): Promise<InternshipEntity[] | void> {
    return this._groupsService.findAll();
  }

  @Get(':studentId')
  findOne(
    @Param() params: { studentId: string },
  ): Promise<InternshipEntity | void> {
    return this._groupsService.findOne(params.studentId);
  }

  @Post()
  create(
    @Body() internshipDto: CreateInternshipDto,
  ): Promise<InternshipEntity> {
    return this._groupsService.create(internshipDto);
  }

  @Put(':studentId')
  update(
    @Param() params: { studentId: string },
    @Body() internshipDto: CreateInternshipDto,
  ): Promise<InternshipEntity | void> {
    return this._groupsService.update(params.studentId, internshipDto);
  }

  @Put(':studentId/tracking')
  updateState(
    @Param() params: { studentId: string },
    @Body() body: { state: string; content: string },
  ) {
    if (!InternshipStates.isAllowedState(body.state))
      throw BAD_TRACKING_STATE(body.state);
    // Treat request and update tracking -> implement service + dao
  }

  @Delete(':studentId')
  delete(
    @Param() params: { studentId: string },
  ): Promise<InternshipEntity | void> {
    return this._groupsService.delete(params.studentId);
  }
}
