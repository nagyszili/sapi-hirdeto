import { Field, InputType, Int } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class ImageInput {
  @Field(() => Int)
  priority: number;

  @Field(() => GraphQLUpload)
  image: FileUpload;
}
