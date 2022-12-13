import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Nested Schema
@Schema({ _id: false })
export class Compensation extends Document {
  @Prop({ type: String, required: true, trim: true })
  gratificationAmount: string;

  @Prop({ type: String, required: true, trim: true })
  modalities: string;

  @Prop({ type: String, required: true, trim: true })
  othersAdvantages: string;
}
export const CompensationSchema = SchemaFactory.createForClass(Compensation);
