import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { CategoryModel } from 'src/category/category.schema';
import {
  AttributeValueModel,
  AttributeValueSchema,
} from 'src/attribute-value/attribute-value.schema';
import { UserModel } from 'src/user/user.schema';
import { CURRENCY } from 'src/util/constants';
import { LocationModel, LocationSchema } from 'src/location/locations.schema';
import { ImageModel, ImageSchema } from './image/image.schema';

@Schema({ timestamps: true })
export class AdModel extends Document {
  @Prop()
  name: string;

  @Prop()
  identifier: string;

  @Prop()
  price: number;

  @Prop({
    enum: [CURRENCY.EURO, CURRENCY.LEI],
  })
  currency: string;

  @Prop()
  description: string;

  @Prop()
  thumbnail: string;

  @Prop([ImageSchema])
  images: ImageModel[];

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'UserModel',
  })
  user: UserModel;

  @Prop(LocationSchema)
  location: LocationModel;

  @Prop({ default: 0 })
  views: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: CategoryModel.name,
  })
  category: CategoryModel;

  @Prop([AttributeValueSchema])
  attributeValues: AttributeValueModel[];
}

export const AdSchema = SchemaFactory.createForClass(AdModel);
