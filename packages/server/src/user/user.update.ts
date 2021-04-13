import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';

@ArgsType()
export class UserUpdate {
  @Field({ nullable: true })
  name?: string;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @IsPhoneNumber('RO')
  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  role?: string;
}
