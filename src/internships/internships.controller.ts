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
import { BAD_TRACKING_STATE } from 'src/shared/HttpError';
import * as InternshipStates from 'src/shared/InternshipState';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { InternshipEntity } from './entities/internship.entity';
import { InternshipService } from './internships.service';

@Controller('internships')
@UseInterceptors(HttpInterceptor)
export class InternshipsController {
  constructor(private readonly _internshipsService: InternshipService) {}

  @Get()
  findAll(): Promise<InternshipEntity[] | void> {
    return this._internshipsService.findAll();
  }

  @Get(':studentId')
  findOne(
    @Param() params: { studentId: string },
  ): Promise<InternshipEntity | void> {
    return this._internshipsService.findOne(params.studentId);
  }

  @Post()
  create(
    @Body() internshipDto: CreateInternshipDto,
  ): Promise<InternshipEntity> {
    return this._internshipsService.create(internshipDto);
  }

  @Put(':studentId')
  update(
    @Param() params: { studentId: string },
    @Body() internshipDto: CreateInternshipDto,
  ): Promise<InternshipEntity | void> {
    return this._internshipsService.update(params.studentId, internshipDto);
  }

  @Put(':studentId/tracking')
  updateState(
    @Param() params: { studentId: string },
    @Body() body: { state: string; content?: string | boolean },
  ): Promise<InternshipEntity | void> {
    if (!InternshipStates.isStateValid(body.state))
      throw BAD_TRACKING_STATE(body.state);
    // AMINE : Handle PDF file upload -> save file in /pdf/ folder and set content as local file URL. In case of step with no file, set content as true/false
    return this._internshipsService.updateTracking(
      params.studentId,
      body.state,
      body.content,
    );
  }

  @Delete(':studentId')
  delete(
    @Param() params: { studentId: string },
  ): Promise<InternshipEntity | void> {
    return this._internshipsService.delete(params.studentId);
  }
}
