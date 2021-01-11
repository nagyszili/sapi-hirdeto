import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Attribute {
  @Field()
  title: string;

  @Field()
  type: string;

  @Field(() => [String])
  possibleValues: string[];
}
