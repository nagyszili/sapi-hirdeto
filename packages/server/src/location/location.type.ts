import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class Location {
  @Field(() => Float, { nullable: true })
  longitude: number;

  @Field(() => Float, { nullable: true })
  latitude: number;

  @Field({ nullable: true })
  name: string;

  @Field()
  county: string;
}
