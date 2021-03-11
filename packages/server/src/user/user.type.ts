import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Ad } from 'src/ad/ad.type';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field(() => [Ad], { nullable: true })
  favorites?: Ad[];
}
