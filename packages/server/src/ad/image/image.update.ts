import { Field, InputType, Int } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class ImageUpdate {
  @Field({ nullable: true })
  url?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload;

  @Field(() => Int)
  priority: number;
}
