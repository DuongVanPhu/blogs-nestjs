import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, ObjectId, Types,} from 'mongoose';

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  avatar: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
