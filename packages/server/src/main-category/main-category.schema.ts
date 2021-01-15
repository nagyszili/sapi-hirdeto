import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MainCategoryModel extends Document {
  @Prop()
  identifier: string;

  @Prop()
  name: string;
}

export const MainCategorySchema = SchemaFactory.createForClass(
  MainCategoryModel,
);
