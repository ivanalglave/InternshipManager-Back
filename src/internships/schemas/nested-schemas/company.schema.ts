import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address, AddressSchema } from './address.schema';

// Nested Schema
@Schema({ _id: false })
export class Company extends Document {
  @Prop({ type: String, required: true, trim: true })
  ceoName: string;

  @Prop({ type: String, required: true, trim: true })
  companyName: string;

  @Prop({ type: String, required: true, trim: true })
  hrContactName: string;

  @Prop({ type: String, required: true, trim: true })
  hrContactEmail: string;

  @Prop({ type: AddressSchema, required: true, trim: true })
  address: Address;
}
export const CompanySchema = SchemaFactory.createForClass(Company);
