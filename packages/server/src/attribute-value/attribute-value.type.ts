import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AttributeValue {
  @Field()
  key: string;

  @Field()
  value: string;
}
