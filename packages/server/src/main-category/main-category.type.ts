import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class MainCategory {
  @Field(() => ID)
  id: string;

  @Field()
  identifier: string;

  @Field()
  name: string;
}
