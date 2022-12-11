export class TrackingEntity {
  state: string;
  status: string;

  constructor(partial: Partial<TrackingEntity>) {
    Object.assign(this, partial);
  }
}
