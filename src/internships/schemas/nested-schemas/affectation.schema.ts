import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address, AddressSchema } from './address.schema';

// Nested Schema
@Schema({ _id: false })
export class Affectation extends Document {
  @Prop({ type: String, required: true, trim: true })
  service: string;

  @Prop({ type: String, required: true, trim: true })
  responsibleName: string;

  @Prop({ type: String, required: true, trim: true })
  responsibleEmail: string;

  @Prop({ type: String, required: true, trim: true })
  responsiblePhone: string;

  @Prop({ type: String, required: true, trim: true })
  responsibleFunction: string;

  @Prop({ type: Date, required: true, trim: true })
  dateStart: Date;

  @Prop({ type: Date, required: true, trim: true })
  dateEnd: Date;

  @Prop({ type: AddressSchema, required: true, trim: true })
  address: Address;
}
export const AffectationSchema = SchemaFactory.createForClass(Affectation);
