import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'apollo-server-express';

@ArgsType()
export class UserUpdate {
  @Field({ nullable: true })
  name?: string;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email?: string;

  @IsPhoneNumber('RO')
  @Field({ nullable: true })
  phoneNumber?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  profilePicture?: FileUpload;
}
