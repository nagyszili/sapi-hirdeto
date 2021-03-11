import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PossibleValuesInput {
  @Field({ nullable: true })
  dependingKey?: string;

  @Field(() => [String])
  values: string[];
}
