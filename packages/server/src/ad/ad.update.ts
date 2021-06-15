import { ArgsType, Field } from '@nestjs/graphql';
import { AttributeValueInput } from 'src/attribute-value/attribute-value.input';
import {
  MinLength,
  MaxLength,
  ArrayMaxSize,
  IsArray,
  IsOptional,
} from 'class-validator';
import { LocationInput } from 'src/location/location.input';
import { ImageUpdate } from './image/image.update';

@ArgsType()
export class AdUpdate {
  @MinLength(12)
  @MaxLength(100)
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  currency: string;

  @Field()
  negotiable: boolean;

  @MinLength(60)
  @MaxLength(9000)
  @Field()
  description: string;

  @Field(() => ImageUpdate, { nullable: true })
  thumbnail?: ImageUpdate;

  @ArrayMaxSize(8)
  @IsArray()
  @IsOptional()
  @Field(() => [String], { nullable: true })
  deletedImages?: string[];

  @ArrayMaxSize(8)
  @IsArray()
  @IsOptional()
  @Field(() => [ImageUpdate], { nullable: true })
  images?: ImageUpdate[];

  @Field(() => LocationInput)
  location: LocationInput;

  @Field()
  categoryId: string;

  @Field(() => [AttributeValueInput], { nullable: true })
  attributeValues?: AttributeValueInput[];
}
