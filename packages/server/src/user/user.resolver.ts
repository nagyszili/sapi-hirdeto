import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.type';
import { UserModel } from './user.schema';
import { UserInput } from './user.input';
import { CurrentUser } from './../util/decorators';
import { UserUpdate } from './user.update';
import { modelToObject } from 'src/util/mappers';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async findUser(): Promise<UserModel> {
    return this.userService.getUser();
  }

  @Query(() => User)
  async findUserById(@Args('id') id: string): Promise<User> {
    return modelToObject(await this.userService.findUserById(id));
  }

  @Query(() => [User])
  async findAllUsers(): Promise<User[]> {
    return (await this.userService.findAllUsers()).map((user) =>
      modelToObject(user),
    );
  }

  @Mutation(() => User)
  async createUser(@Args() user: UserInput): Promise<User> {
    const createdUser = await this.userService.createUser(user);
    return modelToObject(createdUser);
  }

  @Mutation(() => User)
  async updateCurrentUser(
    @CurrentUser() currentUser: User,
    @Args() user: UserUpdate,
  ): Promise<User> {
    return modelToObject(
      await this.userService.updateUser(currentUser.id, user),
    );
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args() user: UserUpdate,
  ): Promise<User> {
    return modelToObject(await this.userService.updateUser(id, user));
  }

  @Mutation(() => User)
  async addAdToFavorites(
    @Args('adId') adId: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return modelToObject(
      await this.userService.addAdToFavorites(adId, user.id),
    );
  }
}
