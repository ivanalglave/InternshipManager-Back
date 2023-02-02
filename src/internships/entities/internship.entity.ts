import { ApiProperty } from '@nestjs/swagger';
import { InformationEntity } from './nested-entities/information.entity';
import { TrackingEntity } from './nested-entities/tracking.entity';

export class InternshipEntity {
  @ApiProperty({ type: String })
  studentId: string;
  @ApiProperty({ type: InformationEntity })
  information: InformationEntity;
  @ApiProperty({ type: TrackingEntity })
  tracking: TrackingEntity;

  constructor(partial: Partial<InternshipEntity>) {
    Object.assign(this, partial);
  }
}
