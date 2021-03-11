import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { AttributeValue } from 'src/attribute-value/attribute-value.type';
import { Location } from './../location/location.type';

@ObjectType()
export class AdListItem {
  @Field(() => ID)
  id: string;

  @Field()
  identifier: string;

  @Field()
  name: string;

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

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => Location)
  location: Location;

  @Field(() => Int)
  views: number;

  @Field(() => [AttributeValue], { nullable: true })
  attributeValues?: AttributeValue[];
}
