import { InputType, Field } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class AdImageInput {
  @Field()
  isThumbnail: boolean;

  @Field(() => GraphQLUpload)
  image: FileUpload;
}
