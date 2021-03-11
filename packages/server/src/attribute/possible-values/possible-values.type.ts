import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PossibleValues {
  @Field({ nullable: true })
  dependingKey?: string;

  @Field(() => [String])
  values: string[];
}
