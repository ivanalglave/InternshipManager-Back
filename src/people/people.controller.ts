import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UseGuards
} from '@nestjs/common';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { PeopleEntity } from './entities/people.entity';
import { PeopleService } from './people.service';
import { AuthGuard } from '@nestjs/passport';
import { InternshipService } from 'src/internships/internships.service';
import * as fs from 'fs';

@Controller('people')
@UseInterceptors(HttpInterceptor)
export class PeopleController {
  constructor(private readonly _peopleService: PeopleService, private readonly _internshipService: InternshipService) {}

  //@UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<PeopleEntity[] | void> {
    return this._peopleService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param() params: { id: string }): Promise<PeopleEntity | void> {
    return this._peopleService.findOne(params.id);
  }

  @Post()
  create(@Body() createPeopleDto: CreatePeopleDto): Promise<PeopleEntity> {
    return this._peopleService.create(createPeopleDto);
  }

  @Put(':id')
  update(
    @Param() params: { id: string },
    @Body() updateGroupDto: UpdatePeopleDto,
  ): Promise<PeopleEntity | void> {
    return this._peopleService.update(params.id, updateGroupDto);
  }

  @Delete(':id')
  async delete(@Param() params: { id: string }): Promise<PeopleEntity | void> {

    const internship = await this._internshipService.findOne(params.id);
    if (internship) {
      const filesToDelete = [];
      if (internship.tracking.secretaryEstablishesInternshipAgreement) filesToDelete.push(internship.tracking.secretaryEstablishesInternshipAgreement);
      if (internship.tracking.studentSignsInternshipAgreement) filesToDelete.push(internship.tracking.studentSignsInternshipAgreement);
      if (internship.tracking.responsibleSignsInternshipAgreement) filesToDelete.push(internship.tracking.responsibleSignsInternshipAgreement);
      if (internship.tracking.companySignsInternshipAgreement) filesToDelete.push(internship.tracking.companySignsInternshipAgreement);
      if (internship.tracking.deanSignsInternshipAgreement) filesToDelete.push(internship.tracking.deanSignsInternshipAgreement);
      // Delete all files linked to referenced internship tracking
      await Promise.all(filesToDelete.map(filePath =>
        new Promise((resolveInner, rejectInner) => {
          fs.unlink(filePath, (err) => {
            if (err) rejectInner(`Could not delete file @${filePath}`);
            resolveInner(filePath);
          });
        })
      ));
      await this._internshipService.delete(params.id);
    }
    
    return this._peopleService.delete(params.id);
  }
}
