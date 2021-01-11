import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CategoryModel, CategorySchema } from 'src/category/category.schema';

@Schema()
export class MainCategoryModel extends Document {
  @Prop()
  identifier: string;

  @Prop()
  name: string;

  @Prop([CategorySchema])
  categories: CategoryModel[];
}

export const MainCategorySchema = SchemaFactory.createForClass(
  MainCategoryModel,
);
