import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class PossibleValuesModel extends Document {
  @Prop()
  dependingKey: string;

  @Prop()
  values: string[];
}

export const PossibleValuesSchema =
  SchemaFactory.createForClass(PossibleValuesModel);
