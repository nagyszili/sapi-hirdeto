import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PagingArguments {
  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  perPage?: number;
}
