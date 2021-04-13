import { ArgsType, Field } from '@nestjs/graphql';
import { AttributeValueInput } from 'src/attribute-value/attribute-value.input';
import { LocationInput } from 'src/location/location.input';
import { MinLength, MaxLength, IsArray, ArrayMaxSize } from 'class-validator';
import { ImageInput } from './image/image.input';

@ArgsType()
export class AdInput {
  @MinLength(12)
  @MaxLength(60)
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  currency: string;

  @MinLength(60)
  @MaxLength(9000)
  @Field()
  description: string;

  @IsArray()
  @ArrayMaxSize(8)
  @Field(() => [ImageInput], { nullable: true })
  images: ImageInput[];

  @Field(() => LocationInput)
  location: LocationInput;

  @Field()
  categoryId: string;

  @Field(() => [AttributeValueInput], { nullable: true })
  attributeValues: AttributeValueInput[];
}
