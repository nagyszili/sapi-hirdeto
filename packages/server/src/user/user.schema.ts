import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { LOGIN_TYPES } from 'src/util/constants';
import { AdModel } from 'src/ad/ad.schema';

@Schema()
export class UserModel extends Document {
  @Prop({ default: '', maxlength: 40 })
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phoneNumber: string;

  @Prop({
    enum: [LOGIN_TYPES.PASSWORD, LOGIN_TYPES.GOOGLE, LOGIN_TYPES.FACEBOOK],
  })
  loginType: string;

  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      ref: AdModel.name,
    },
  ])
  favorites: AdModel[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
