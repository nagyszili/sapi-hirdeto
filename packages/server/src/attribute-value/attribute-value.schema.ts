import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AttributeValueModel extends Document {
  @Prop()
  key: string;

  @Prop({ type: {} })
  value: string | number;
}

export const AttributeValueSchema = SchemaFactory.createForClass(
  AttributeValueModel,
);
