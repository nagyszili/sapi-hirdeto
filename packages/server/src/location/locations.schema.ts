import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class LocationModel extends Document {
  @Prop()
  longitude: number;

  @Prop()
  latitude: number;

  @Prop()
  name: string;

  @Prop()
  county: string;
}

export const LocationSchema = SchemaFactory.createForClass(LocationModel);
