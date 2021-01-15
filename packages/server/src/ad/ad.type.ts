import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { User } from 'src/user/user.type';
import { Category } from 'src/category/category.type';
import { AttributeValue } from 'src/attribute-value/attribute-value.type';

@ObjectType()
export class Ad {
  @Field(() => ID)
  id: string;

  @Field()
  identifier: string;

  @Field()
  name: string;

  @Field(() => User)
  user: User;

  @Field(() => Float)
  price: number;

  @Field({ nullable: true })
  description: string;

  @Field(() => [String], { nullable: true })
  images: string[];

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field()
  location: string;

  @Field(() => Int)
  views: number;

  @Field(() => Category)
  category: Category;

  @Field(() => [AttributeValue], { nullable: true })
  attributeValues: AttributeValue[];
}
