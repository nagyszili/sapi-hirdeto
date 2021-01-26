import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ATTRIBUTE_TYPES } from 'src/util/constants';

@Schema()
export class AttributeModel extends Document {
  @Prop()
  title: string;

  @Prop({
    enum: [
      ATTRIBUTE_TYPES.SELECT,
      ATTRIBUTE_TYPES.MULTI_SELECT,
      ATTRIBUTE_TYPES.RANGE,
      ATTRIBUTE_TYPES.CHECKBOX,
    ],
  })
  type: string;

  @Prop()
  possibleValues: string[];
}

export const AttributeSchema = SchemaFactory.createForClass(AttributeModel);
