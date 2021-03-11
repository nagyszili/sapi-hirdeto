import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class Location {
  @Field(() => Float)
  longitude: number;

  @Field(() => Float)
  latitude: number;

  @Field()
  name: string;

  @Field()
  county: string;
}
