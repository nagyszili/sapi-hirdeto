import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ATTRIBUTE_TYPES } from 'src/util/constants';
import {
  PossibleValuesSchema,
  PossibleValuesModel,
} from './possible-values/possible-values.schema';

@Schema({ _id: false })
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

  @Prop([PossibleValuesSchema])
  possibleValues: PossibleValuesModel[];

  @Prop({ default: false })
  required: boolean;

  @Prop()
  dependsBy: string;
}

export const AttributeSchema = SchemaFactory.createForClass(AttributeModel);
