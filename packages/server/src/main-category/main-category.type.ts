import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Category } from 'src/category/category.type';

@ObjectType()
export class MainCategory {
  @Field(() => ID)
  id: string;

  @Field()
  identifier: string;

  @Field()
  name: string;

  @Field(() => [Category])
  categories: Category[];
}
