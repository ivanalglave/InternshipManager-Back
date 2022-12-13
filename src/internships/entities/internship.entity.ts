import { InformationEntity } from './nested-entities/information.entity';
import { TrackingEntity } from './nested-entities/tracking.entity';

export class InternshipEntity {
  studentId: string;
  information: InformationEntity;
  tracking: TrackingEntity;

  constructor(partial: Partial<InternshipEntity>) {
    Object.assign(this, partial);
  }
}
