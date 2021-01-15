import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class MainCategoryInput {
  @Field({ nullable: true })
  identifier?: string;

  @Field({ nullable: true })
  name?: string;
}
