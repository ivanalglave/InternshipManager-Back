import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Nested Schema
@Schema({ _id: false })
export class Address extends Document {
  @Prop({ type: String, required: true, trim: true })
  street: string;

  @Prop({ type: String, required: true, trim: true })
  postalCode: string;

  @Prop({ type: String, required: true, trim: true })
  city: string;

  @Prop({ type: String, required: true, trim: true })
  country: string;
}
export const AddressSchema = SchemaFactory.createForClass(Address);
