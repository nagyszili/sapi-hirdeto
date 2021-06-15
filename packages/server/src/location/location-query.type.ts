import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LocationQueryType {
  @Field()
  type: 'county' | 'location';

  @Field()
  name: string;

  @Field({ nullable: true })
  county?: string;
}
