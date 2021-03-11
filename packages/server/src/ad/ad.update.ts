import { ArgsType, Field } from '@nestjs/graphql';
import { AttributeValueInput } from 'src/attribute-value/attribute-value.input';
import { MinLength, MaxLength, ArrayMaxSize } from 'class-validator';
import { AdImageInput } from './ad-image.input';

@ArgsType()
export class AdUpdate {
  @MinLength(12)
  @MaxLength(60)
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  currency?: string;

  @MinLength(60)
  @MaxLength(9000)
  @Field({ nullable: true })
  description?: string;

  @ArrayMaxSize(8)
  @Field(() => [AdImageInput], { nullable: true })
  images: AdImageInput[];

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  category?: string;

  @Field(() => [AttributeValueInput], { nullable: true })
  attributeValues?: AttributeValueInput[];
}
