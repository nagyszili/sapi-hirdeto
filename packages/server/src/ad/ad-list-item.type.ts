import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { AttributeValue } from 'src/attribute-value/attribute-value.type';
import { Location } from './../location/location.type';
import { User } from 'src/user/user.type';

@ObjectType()
export class AdListItem {
  @Field(() => ID)
  id: string;

  @Field()
  identifier: string;

  @Field()
  status: string;

  @Field()
  name: string;

  @Field(() => User)
  user: User;

  @Field(() => Float)
  price: number;

  @Field()
  currency: string;

  @Field()
  negotiable: boolean;

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

  @Field()
  actualizedAt: Date;

  @Field(() => Location)
  location: Location;

  @Field(() => Int)
  views: number;

  @Field(() => [AttributeValue], { nullable: true })
  attributeValues?: AttributeValue[];
}
