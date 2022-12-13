import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Student, StudentSchema } from './student.schema';
import { Company, CompanySchema } from './company.schema';
import { Affectation, AffectationSchema } from './affectation.schema';
import { Compensation, CompensationSchema } from './compensation.schema';

// Nested Schema
@Schema({ _id: false })
export class Information extends Document {
  @Prop({ type: StudentSchema, required: true, trim: true })
  student: Student;

  @Prop({ type: CompanySchema, required: true, trim: true })
  company: Company;

  @Prop({ type: AffectationSchema, required: true, trim: true })
  affectation: Affectation;

  @Prop({ type: CompensationSchema, required: true, trim: true })
  compensation: Compensation;

  @Prop({ type: String, required: true, trim: true })
  internshipDescription: string;
}
export const InformationSchema = SchemaFactory.createForClass(Information);
