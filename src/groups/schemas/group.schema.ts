import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GroupDocument = Group & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      delete ret._id;
    },
  },
})
export class Group {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: Boolean,
    required: true,
    trim: true,
  })
  final: boolean;

  @Prop({
    type: [String],
    required: true,
    trim: true,
  })
  responsibles: string[];

  @Prop({
    type: [String],
    required: true,
    trim: true,
  })
  secretaries: string[];

  @Prop({
    type: [String],
    required: true,
    trim: true,
  })
  students: string[];

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  parent: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
