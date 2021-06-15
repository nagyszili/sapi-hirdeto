import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LocationQueryInput {
  @Field()
  type: 'county' | 'location';

  @Field()
  name: string;

  @Field({ nullable: true })
  county?: string;
}
