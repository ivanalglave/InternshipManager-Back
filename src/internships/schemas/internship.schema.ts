import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Information,
  InformationSchema,
} from './nested-schemas/information.schema';
import { Tracking, TrackingSchema } from './nested-schemas/tracking.schema';
export type InternshipDocument = Internship & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      delete ret._id;
    },
  },
})
export class Internship {
  @Prop({ type: String, required: true, trim: true })
  studentId: string;

  @Prop({ type: InformationSchema, required: true, trim: true })
  information: Information;

  @Prop({ type: TrackingSchema, required: true, trim: true })
  tracking: Tracking;
}

export const InternshipSchema = SchemaFactory.createForClass(Internship);
