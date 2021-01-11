import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { CategoryModel } from 'src/category/category.schema';
import {
  AttributeValueModel,
  AttributeValueSchema,
} from 'src/attribute-value/attribute-value.schema';
import { UserModel } from 'src/user/user.schema';

@Schema()
export class AdModel extends Document {
  @Prop()
  name: string;

  @Prop()
  identifier: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  images: string[];

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'UserModel',
  })
  user: UserModel;

  @Prop()
  location: string;

  @Prop()
  views: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: CategoryModel.name,
    index: true,
  })
  category: CategoryModel;

  @Prop([AttributeValueSchema])
  attributeValues: AttributeValueModel[];
}

export const AdSchema = SchemaFactory.createForClass(AdModel);
