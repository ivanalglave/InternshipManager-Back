import {
    Prop, raw, Schema, SchemaFactory,
} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({
    toJSON: {
        virtuals: true,
        transform: (dpc: any, ret: any) => { 
            delete ret._id;
        },
    },
    versionKey: false,

})
export class People {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    }) _id: any;

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
    }) role: string;

    @Prop({
        type: [String],
        required: true,
    }) groups: string[];

}

export const PeopleSchema = SchemaFactory.createForClass(People);

PeopleSchema.index({ name: 1 }, { unique: true });