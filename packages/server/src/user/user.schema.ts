import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserModel extends Document {
  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
