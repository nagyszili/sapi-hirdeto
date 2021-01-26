import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LocationInput {
  @Field()
  longitude?: number;

  @Field()
  latitude?: number;

  @Field()
  name?: string;

  @Field()
  county: string;
}
