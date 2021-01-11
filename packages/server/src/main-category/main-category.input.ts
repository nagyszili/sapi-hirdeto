import { Field, ArgsType } from '@nestjs/graphql';
import { CategoryInput } from 'src/category/category.input';

@ArgsType()
export class MainCategoryInput {
  @Field({ nullable: true })
  identifier?: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => [CategoryInput], { nullable: true })
  categories?: CategoryInput[];
}
