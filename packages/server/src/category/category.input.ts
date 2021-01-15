import { Field, InputType } from '@nestjs/graphql';
import { AttributeInput } from 'src/attribute/attribute.input';

@InputType()
export class CategoryInput {
  @Field()
  identifier: string;

  @Field()
  name: string;

  @Field(() => [AttributeInput])
  attributes: AttributeInput[];

  @Field()
  mainCategoryId: string;
}
