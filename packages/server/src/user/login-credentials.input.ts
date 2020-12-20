import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LoginCredentials {
  @Field()
  email: string;

  @Field()
  password: string;
}
