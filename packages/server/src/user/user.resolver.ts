import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.type';
import { UserInput } from './user.input';
import { UserRole, CurrentUser, AdminRole } from './../util/decorators';
import { UserUpdate } from './user.update';
import { modelToObject, mapUserToUserAdsList } from 'src/util/mappers';
import { UserAdsList } from './user-ads-list.type';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserAdsList)
  @UserRole()
  async currentUser(@CurrentUser() user: User): Promise<UserAdsList> {
    return {
      ...user,
      favorites: user.favorites.map((ad) => ad.id),
    };
  }

  @AdminRole()
  @Query(() => Int)
  async countUsersByDate(
    @Args('fromDate') fromDate: Date,
    @Args('toDate') toDate: Date,
  ): Promise<number> {
    return this.userService.countUsersByDate(fromDate, toDate);
  }

  @Query(() => User)
  async findUserById(@Args('id') id: string): Promise<User> {
    return modelToObject(await this.userService.findUserById(id));
  }

  @UserRole()
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

  @UserRole()
  @Mutation(() => User)
  async updateCurrentUser(
    @CurrentUser() currentUser: User,
    @Args() user: UserUpdate,
  ): Promise<User> {
    return modelToObject(
      await this.userService.updateUser(currentUser.id, user),
    );
  }

  @AdminRole()
  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args() user: UserUpdate,
  ): Promise<User> {
    return modelToObject(await this.userService.updateUser(id, user));
  }

  @UserRole()
  @Mutation(() => UserAdsList)
  async addAdToFavorites(
    @Args('adId') adId: string,
    @CurrentUser() user: User,
  ): Promise<UserAdsList> {
    return mapUserToUserAdsList(
      modelToObject(await this.userService.addAdToFavorites(adId, user.id)),
    );
  }
}
