import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Nested Schema
@Schema({ _id: false })
export class Tracking extends Document {
  @Prop({ type: String, required: true, trim: true })
  state: string;

  @Prop({ type: Boolean, required: false, trim: true })
  studentEntersInternshipInformation?: boolean;

  @Prop({ type: Boolean, required: false, trim: true })
  responsibleAcceptsInternshipInformation?: boolean;

  @Prop({ type: String, required: false, trim: true })
  secretaryEstablishesInternshipAgreement?: string;

  @Prop({ type: String, required: false, trim: true })
  studentSignsInternshipAgreement?: string;

  @Prop({ type: String, required: false, trim: true })
  responsibleSignsInternshipAgreement?: string;

  @Prop({ type: String, required: false, trim: true })
  companySignsInternshipAgreement?: string;

  @Prop({ type: String, required: false, trim: true })
  deanSignsInternshipAgreement?: string;
}
export const TrackingSchema = SchemaFactory.createForClass(Tracking);
