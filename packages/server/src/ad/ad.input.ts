import { ArgsType, Field } from '@nestjs/graphql';
import { AttributeValueInput } from 'src/attribute-value/attribute-value.input';
import { LocationInput } from 'src/location/location.input';

@ArgsType()
export class AdInput {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  currency: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => [String], { nullable: true })
  images: string[];

  @Field(() => LocationInput)
  location: LocationInput;

  @Field()
  categoryId: string;

  @Field(() => [AttributeValueInput], { nullable: true })
  attributeValues: AttributeValueInput[];
}
