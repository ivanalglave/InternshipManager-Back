import { ApiProperty } from '@nestjs/swagger';

export class CompensationEntity {
  @ApiProperty()
  gratificationAmount: string;
  @ApiProperty()
  modalities: string;
  @ApiProperty()
  othersAdvantages: string;

  constructor(partial: Partial<CompensationEntity>) {
    Object.assign(this, partial);
  }
}
