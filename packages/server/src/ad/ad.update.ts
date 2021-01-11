import { ArgsType, Field } from '@nestjs/graphql';
import { AttributeValueInput } from 'src/attribute-value/attribute-value.input';

@ArgsType()
export class AdUpdate {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  images?: string[];

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  category?: string;

  @Field(() => [AttributeValueInput], { nullable: true })
  attributeValues?: AttributeValueInput[];
}
