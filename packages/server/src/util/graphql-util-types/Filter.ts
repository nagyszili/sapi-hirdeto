import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class Filter {
  @Field()
  type: string;

  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  from?: number;

  @Field(() => Int, { nullable: true })
  to?: number;

  @Field(() => [String], { nullable: true })
  selectedAttributeValues?: string[];
}
