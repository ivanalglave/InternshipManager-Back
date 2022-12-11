import {
  HttpException,
  NotFoundException,
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';

export const NOT_FOUND = new NotFoundException();
export const CONFLICT = new ConflictException();
export const BAD_TRACKING_STATE = (badState: string) =>
  new UnprocessableEntityException(`Unknown state [${badState}]`);
export const CUSTOM = (reason: string, errorStatus: number) =>
  new HttpException(reason, errorStatus);
