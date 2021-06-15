import { Field, InputType } from '@nestjs/graphql';
import { PossibleValuesInput } from './possible-values/possible-values.input';

@InputType()
export class AttributeInput {
  @Field()
  title: string;

  @Field()
  type: string;

  @Field(() => [PossibleValuesInput])
  possibleValues: PossibleValuesInput[];

  @Field({ nullable: true })
  required?: boolean;

  @Field({ nullable: true })
  dependsBy?: string;
}
