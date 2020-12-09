import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UserInput {
  @Field()
  name: string;
}
