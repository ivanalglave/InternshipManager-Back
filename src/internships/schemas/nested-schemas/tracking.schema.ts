import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Nested Schema
@Schema({ _id: false })
export class Tracking extends Document {
  @Prop({ type: String, required: true, trim: true })
  status: string;

  @Prop({ type: String, required: true, trim: true })
  state: string;
}
export const TrackingSchema = SchemaFactory.createForClass(Tracking);
