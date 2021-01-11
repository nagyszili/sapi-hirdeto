import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Attribute } from 'src/attribute/attribute.type';

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  identifier: string;

  @Field(() => [Attribute])
  attributes: Attribute[];
}
