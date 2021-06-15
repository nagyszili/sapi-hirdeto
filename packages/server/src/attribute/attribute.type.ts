import { ObjectType, Field } from '@nestjs/graphql';
import { PossibleValues } from './possible-values/possible-values.type';

@ObjectType()
export class Attribute {
  @Field()
  title: string;

  @Field()
  type: string;

  @Field(() => [PossibleValues])
  possibleValues: PossibleValues[];

  @Field()
  required: boolean;

  @Field({ nullable: true })
  dependsBy?: string;
}
