import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class MainCategoryInput {
  @Field()
  identifier: string;

  @Field()
  name: string;
}
