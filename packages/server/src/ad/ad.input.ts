import { ArgsType, Field } from '@nestjs/graphql';
import { AttributeValueInput } from 'src/attribute-value/attribute-value.input';

@ArgsType()
export class AdInput {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  description: string;

  @Field(() => [String], { nullable: true })
  images: string[];

  @Field()
  location: string;

  @Field()
  categoryId: string;

  @Field(() => [AttributeValueInput], { nullable: true })
  attributeValues: AttributeValueInput[];
}
