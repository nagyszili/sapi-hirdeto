import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AttributeInput {
  @Field()
  title: string;

  @Field()
  type: string;

  @Field(() => [String])
  possibleValues: string[];
}
