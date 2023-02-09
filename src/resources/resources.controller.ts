import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { NOT_FOUND } from 'src/shared/HttpError';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';

@Controller('resources')
@UseInterceptors(HttpInterceptor)
export class ResourcesController {
  @Get('agreements/:filename')
  serveAgreement(
    @Param('filename') filename,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const filepath = `files/${filename}`;
    if (!existsSync(filepath)) throw NOT_FOUND;
    const file = createReadStream(filepath);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="agreement.pdf"',
    });
    return new StreamableFile(file);
  }
}
