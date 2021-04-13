import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Image {
  @Field(() => Int)
  priority: number;

  @Field()
  url: string;
}
