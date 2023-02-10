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

  // uploads even if invalid state...
  @Put(':studentId/:state')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (_req, _file, cb) => {
          return cb(null, `${v4()}.pdf`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.pdf$/)) {
          return cb(new Error('Only PDF files are allowed!'), false);
        }
        cb(null, true);
      },
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

  @Delete(':studentId')
  delete(
    @Param() params: { studentId: string },
  ): Promise<InternshipEntity | void> {
    return this._internshipsService.delete(params.studentId);
  }
}
