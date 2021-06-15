import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Filter } from './Filter';
import { LocationQueryInput } from 'src/location/location-query.input';

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

  @Field(() => LocationQueryInput, { nullable: true })
  location?: LocationQueryInput;

  @Field(() => String)
  currency: string;

  @Field(() => String, { nullable: true })
  creatorId?: string;

  @Field(() => [Filter], { nullable: true })
  filters?: Filter[];
}
