import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Ad } from './ad.type';
import { AdInput } from './ad.input';
import { AdService } from './ad.service';
import {
  modelToObject,
  mapObjectsToAds,
  mapObjectToAd,
} from 'src/util/mappers';
import { UserRole, CurrentUser, ManagerRole } from 'src/util/decorators';
import { User } from 'src/user/user.type';
import { QueryParameters } from 'src/util/graphql-util-types/QueryParameters';
import { AdListItem } from './ad-list-item.type';
import { PagingArguments } from 'src/util/graphql-util-types/PagingArguments';
import { AdUpdate } from './ad.update';

@Resolver()
export class AdResolver {
  constructor(private adService: AdService) {}

  @ManagerRole()
  @Query(() => Int)
  async countAdsByDate(
    @Args('fromDate') fromDate: Date,
    @Args('toDate') toDate: Date,
  ): Promise<number> {
    return this.adService.countAdsByDate(fromDate, toDate);
  }

  @Query(() => Ad)
  async findAdById(@Args('id') id: string): Promise<Ad> {
    return modelToObject(await this.adService.findAdById(id));
  }

  @Query(() => Ad)
  async findAdByIdentifier(
    @Args('identifier') identifier: string,
    @Args('userId', { nullable: true }) userId?: string,
  ): Promise<Ad> {
    return modelToObject(
      await this.adService.findAdByIdentifier(identifier, userId),
    );
  }

  @UserRole()
  @Query(() => [AdListItem])
  async findAdsByUser(
    @CurrentUser() user: User,
    @Args() paging: PagingArguments,
  ): Promise<AdListItem[]> {
    return mapObjectsToAds(await this.adService.findAdsByUser(user.id, paging));
  }

  @UserRole()
  @Query(() => [AdListItem])
  async findFavoriteAdsByUser(
    @CurrentUser() user: User,
  ): Promise<AdListItem[]> {
    return mapObjectsToAds(await this.adService.findFavoriteAdsByUser(user.id));
  }

  @Query(() => [AdListItem])
  async findAllAds(
    @Args() queryParameters: QueryParameters,
  ): Promise<AdListItem[]> {
    const ads = mapObjectsToAds(
      await this.adService.findAllAds(queryParameters),
    );

    return ads;
  }

  @Query(() => [AdListItem])
  async findAdsByIds(
    @Args('ids', { type: () => [String] }) ids: string[],
  ): Promise<AdListItem[]> {
    return mapObjectsToAds(await this.adService.findAdsByIds(ids));
  }

  @Query(() => Int)
  async countAllAds(@Args() queryParameters: QueryParameters): Promise<number> {
    return this.adService.count(queryParameters);
  }

  @Query(() => Int)
  async estimatedCount(): Promise<number> {
    return this.adService.estimatedCount();
  }

  @UserRole()
  @Mutation(() => AdListItem)
  async createAd(
    @Args() adInput: AdInput,
    @CurrentUser() user: User,
  ): Promise<AdListItem> {
    return mapObjectToAd(await this.adService.createAd(adInput, user.id));
  }

  @UserRole()
  @Mutation(() => AdListItem)
  async updateAd(
    @Args('id') id: string,
    @Args() adUpdate: AdUpdate,
    @CurrentUser() user: User,
  ): Promise<AdListItem> {
    return mapObjectToAd(await this.adService.updateAd(id, adUpdate, user));
  }

  @UserRole()
  @Mutation(() => Ad)
  async setAdStatus(
    @Args('id') id: string,
    @Args('status') status: string,
    @CurrentUser() user: User,
    @Args('reasonOfDelete', { nullable: true }) reasonOfDelete?: string,
  ): Promise<Ad> {
    return modelToObject(
      await this.adService.setAdStatus(id, status, user, reasonOfDelete),
    );
  }

  @UserRole()
  @Mutation(() => AdListItem)
  async actualizeAd(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<AdListItem> {
    return mapObjectToAd(await this.adService.actualizeAd(id, user));
  }
}
