import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AttributeValueInput {
  @Field()
  key: string;

  @Field()
  value: string;
}
