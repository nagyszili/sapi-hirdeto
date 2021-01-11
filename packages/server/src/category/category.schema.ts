import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  AttributeModel,
  AttributeSchema,
} from 'src/attribute/attribute.schema';

@Schema()
export class CategoryModel extends Document {
  @Prop()
  identifier: string;

  @Prop()
  name: string;

  @Prop([AttributeSchema])
  attributes: AttributeModel[];
}

export const CategorySchema = SchemaFactory.createForClass(CategoryModel);
