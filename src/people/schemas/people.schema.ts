import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PeopleDocument = People & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      delete ret._id;
    },
  },
})
export class People {
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
      id: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    }) firstname: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    }) lastname: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    }) email: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    }) passwordHash: string;

    @Prop({
        type: Number,
        required: true,
    }) role: number;

}

export const PeopleSchema = SchemaFactory.createForClass(People);

PeopleSchema.index({ id: 1 }, { unique: true });