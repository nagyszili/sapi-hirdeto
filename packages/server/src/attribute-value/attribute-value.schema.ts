import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AttributeValueModel extends Document {
  @Prop()
  key: string;

  @Prop()
  value: string;
}

export const AttributeValueSchema = SchemaFactory.createForClass(
  AttributeValueModel,
);
