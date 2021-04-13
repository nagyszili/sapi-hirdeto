import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class ImageModel extends Document {
  @Prop()
  priority: number;

  @Prop()
  url: string;
}

export const ImageSchema = SchemaFactory.createForClass(ImageModel);
