import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AttributeModel extends Document {
  @Prop()
  title: string;

  @Prop()
  type: string;

  @Prop()
  possibleValues: string[];
}

export const AttributeSchema = SchemaFactory.createForClass(AttributeModel);
