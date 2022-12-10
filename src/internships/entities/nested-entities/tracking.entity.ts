export class TrackingEntity {
  status: string;
  state: string;

  constructor(partial: Partial<TrackingEntity>) {
    Object.assign(this, partial);
  }
}
