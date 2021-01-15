import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  AttributeModel,
  AttributeSchema,
} from 'src/attribute/attribute.schema';
import { MainCategoryModel } from 'src/main-category/main-category.schema';

@Schema()
export class CategoryModel extends Document {
  @Prop()
  identifier: string;

  @Prop()
  name: string;

  @Prop([AttributeSchema])
  attributes: AttributeModel[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: MainCategoryModel.name,
  })
  mainCategory: MainCategoryModel;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryModel);
