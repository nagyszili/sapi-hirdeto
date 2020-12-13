import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.type';
import { UserModel } from './user.schema';
import { UserInput } from './user.input';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  findUser(): Promise<UserModel> {
    return this.userService.getUser();
  }

  @Query(() => [User])
  findAllUsers(): Promise<UserModel[]> {
    return this.userService.findAllUsers();
  }

  @Mutation(() => User)
  createUser(@Args() user: UserInput): Promise<UserModel> {
    const createdUser = this.userService.createUser(user);
    return createdUser;
  }
}
