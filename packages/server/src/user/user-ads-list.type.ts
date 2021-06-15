import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserAdsList {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field()
  loginType: string;

  @Field()
  role: string;

  @Field({ nullable: true })
  profilePictureUrl?: string;

  @Field(() => [String], { nullable: true })
  favorites?: string[];
}
