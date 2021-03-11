import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  AttributeModel,
  AttributeSchema,
} from 'src/attribute/attribute.schema';
import {
  MainCategoryModel,
  MainCategorySchema,
} from 'src/main-category/main-category.schema';

@Schema()
export class CategoryModel extends Document {
  @Prop()
  identifier: string;

  @Prop()
  name: string;

  @Prop([AttributeSchema])
  attributes: AttributeModel[];

  @Prop(MainCategorySchema)
  mainCategory: MainCategoryModel;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryModel);
