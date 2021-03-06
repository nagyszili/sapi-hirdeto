import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
