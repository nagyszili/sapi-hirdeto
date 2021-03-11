import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { User } from 'src/user/user.type';
import { Category } from 'src/category/category.type';
import { AttributeValue } from 'src/attribute-value/attribute-value.type';
import { Location } from './../location/location.type';

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

  @Field()
  currency: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field(() => Int)
  numberOfImages: number;

  @Field(() => [String], { nullable: true })
  images?: string[];

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => Location)
  location: Location;

  @Field(() => Int)
  views: number;

  @Field(() => Category)
  category: Category;

  @Field(() => [AttributeValue], { nullable: true })
  attributeValues?: AttributeValue[];
}
