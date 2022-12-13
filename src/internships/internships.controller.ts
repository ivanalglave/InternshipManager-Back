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
import * as path from 'path';
import {
  STATE_RESPONSIBLE_ACCEPTS_INTERNSHIP_INFORMATION,
  STATE_STUDENT_ENTERS_INTERNSHIP_INFORMATION,
} from 'src/shared/InternshipState';
import config from 'src/config';
import { Optional } from '@nestjs/common/decorators';
import { v4 } from 'uuid';

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

  @Put(':studentId/:state')
  @UseInterceptors(
    FileInterceptor('pdf', {
      dest: './internship-agreements',
      fileFilter: (req, file, cb) => {
        file.filename = `${v4()}.pdf`;
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

    // AMINE : Handle PDF file upload -> save file in /pdf/ folder and set content as local file URL. In case of step with no file, set content as true/false

    //case where there isn't a file
    //Deux premiers états

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

    //case where there is a file
    if (!file) throw BAD_REQUEST;
    console.log(file);
    console.log(config);
    return this._internshipsService.updateTracking(
      params.studentId,
      params.state,
      path.join(
        `${config.server.url}:${config.server.port}`,
        file.path,
        file.fieldname,
      ),
    );
  }

  @Delete(':studentId')
  delete(
    @Param() params: { studentId: string },
  ): Promise<InternshipEntity | void> {
    return this._internshipsService.delete(params.studentId);
  }
}
