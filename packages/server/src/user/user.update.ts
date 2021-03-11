import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber } from 'class-validator';

@ArgsType()
export class UserUpdate {
  @Field({ nullable: true })
  name?: string;

  @IsEmail()
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @IsPhoneNumber('RO')
  @Field({ nullable: true })
  phoneNumber?: string;
}
