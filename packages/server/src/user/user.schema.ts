import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserModel extends Document {
  @Prop({ default: '', maxlength: 30 })
  firstName: string;

  @Prop({ default: '', maxlength: 30 })
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
