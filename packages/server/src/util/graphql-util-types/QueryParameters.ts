import { ArgsType, Field, Int } from '@nestjs/graphql';
import { LocationInput } from 'src/location/location.input';
import { Filter } from './Filter';

@ArgsType()
export class QueryParameters {
  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  perPage?: number;

  @Field(() => String, { nullable: true })
  sortField?: string;

  @Field(() => Int, { nullable: true })
  sortOrder?: number;

  @Field(() => String, { nullable: true })
  queryString?: string;

  @Field(() => Boolean, { nullable: true })
  inDescription?: boolean;

  @Field(() => String, { nullable: true })
  categoryIdentifier?: string;

  @Field(() => String, { nullable: true })
  mainCategoryIdentifier?: string;

  @Field(() => LocationInput, { nullable: true })
  location?: LocationInput;

  @Field(() => String)
  currency: string;

  @Field(() => [Filter], { nullable: true })
  filters?: Filter[];
}
