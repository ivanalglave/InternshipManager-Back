import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BAD_REQUEST, BAD_TRACKING_STATE } from 'src/shared/HttpError';
import * as InternshipStates from 'src/shared/InternshipState';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { InternshipEntity } from './entities/internship.entity';
import { InternshipService } from './internships.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  STATE_RESPONSIBLE_ACCEPTS_INTERNSHIP_INFORMATION,
  STATE_STUDENT_ENTERS_INTERNSHIP_INFORMATION,
} from 'src/shared/InternshipState';
import config from 'src/config';
import { Optional } from '@nestjs/common/decorators';
import { v4 } from 'uuid';
import { diskStorage } from 'multer';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('internships')
@UseInterceptors(HttpInterceptor)
export class InternshipsController {
  constructor(private readonly _internshipsService: InternshipService) {}

  @ApiResponse({
    status: 200,
    type: [InternshipEntity],
    description: 'Students as a JSON objects list',
  })
  @Get()
  findAll(): Promise<InternshipEntity[] | void> {
    return this._internshipsService.findAll();
  }

  @ApiResponse({
    status: 200,
    type: InternshipEntity,
    description: 'Student as a JSON object',
  })
  @ApiParam({
    name: 'studentId',
    type: String,
    description: 'Id of the student whose internship to get',
  })
  @Get(':studentId')
  findOne(
    @Param() params: { studentId: string },
  ): Promise<InternshipEntity | void> {
    return this._internshipsService.findOne(params.studentId);
  }

  @ApiResponse({ status: 201, description: 'Student was created successfully' })
  @ApiBody({
    type: CreateInternshipDto,
    description: 'Internship as a JSON object',
  })
  @Post()
  create(
    @Body() internshipDto: CreateInternshipDto,
  ): Promise<InternshipEntity> {
    return this._internshipsService.create(internshipDto);
  }

  @ApiResponse({ status: 200, description: 'Student was updated successfully' })
  @ApiParam({
    name: 'studentId',
    type: String,
    description: 'Id of the student whose internship to update',
  })
  @Put(':studentId')
  update(
    @Param() params: { studentId: string },
    @Body() internshipDto: CreateInternshipDto,
  ): Promise<InternshipEntity | void> {
    return this._internshipsService.update(params.studentId, internshipDto);
  }

  // uploads even if invalid state...
  @ApiParam({
    name: 'studentId',
    type: String,
    description: 'Id of the student whose internship to update',
  })
  @ApiParam({ name: 'state', type: String, description: 'State to update' })
  @ApiResponse({ status: 200, description: 'State was updated successfully' })
  @Put(':studentId/:state')
  @UseInterceptors(
    FileInterceptor('pdf', {
      storage: diskStorage({
        destination: './files',
        filename: (_req, _file, cb) => {
          return cb(null, `${v4()}.pdf`);
        },
      }),
    }),
  )
  updateState(
    @Param() params: { studentId: string; state: string },
    @Optional() @Body() body: { content?: boolean },
    @Optional() @UploadedFile() file,
  ): Promise<InternshipEntity | void> {
    if (!InternshipStates.isStateValid(params.state))
      throw BAD_TRACKING_STATE(params.state);
    if (
      params.state === STATE_STUDENT_ENTERS_INTERNSHIP_INFORMATION ||
      params.state === STATE_RESPONSIBLE_ACCEPTS_INTERNSHIP_INFORMATION
    ) {
      if (!body) throw BAD_REQUEST;
      return this._internshipsService.updateTracking(
        params.studentId,
        params.state,
        body.content,
      );
    }

    if (!file) throw BAD_REQUEST;
    console.log(params.state);
    return this._internshipsService.updateTracking(
      params.studentId,
      params.state,
      `${config.server.uri}:${config.server.port}/resources/agreements/${file.filename}`,
    );
  }

  @ApiParam({
    name: 'studentId',
    type: String,
    description: 'Id of the student to delete',
  })
  @ApiResponse({ status: 200, description: 'Student was deleted' })
  @Delete(':studentId')
  delete(
    @Param() params: { studentId: string },
  ): Promise<InternshipEntity | void> {
    return this._internshipsService.delete(params.studentId);
  }
}
