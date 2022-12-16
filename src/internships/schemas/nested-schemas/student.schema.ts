import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address, AddressSchema } from './address.schema';

// Nested Schema
@Schema({ _id: false })
export class Student extends Document {
  @Prop({ type: String, required: true, trim: true })
  completeName: string;

  @Prop({ type: String, required: true, trim: true })
  phone: string;

  @Prop({ type: Date, required: true, trim: true })
  birthDate: Date;

  @Prop({ type: AddressSchema, required: true, trim: true })
  address: Address;

  @Prop({ type: String, required: true, trim: true })
  FormationAndSpecialty: string;

  @Prop({ type: String, required: true, trim: true })
  email: string;

  @Prop({ type: String, required: true, trim: true })
  socialSecurityNumber: string;
}
export const StudentSchema = SchemaFactory.createForClass(Student);
