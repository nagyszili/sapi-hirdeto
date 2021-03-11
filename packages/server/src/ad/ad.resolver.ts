import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Ad } from './ad.type';
import { AdInput } from './ad.input';
import { AdService } from './ad.service';
import { modelToObject, mapObjectsToAds } from 'src/util/mappers';
import { AdUpdate } from './ad.update';
import { CurrentUser } from 'src/util/decorators';
import { User } from 'src/user/user.type';
import { QueryParameters } from 'src/util/graphql-util-types/QueryParameters';
import { AdListItem } from './ad-list-item.type';

@Resolver()
export class AdResolver {
  constructor(private adService: AdService) {}

  @Query(() => Ad)
  async findAdById(@Args('id') id: string): Promise<Ad> {
    return modelToObject(await this.adService.findAdById(id));
  }

  @Query(() => Ad)
  async findAdByIdentifier(
    @Args('identifier') identifier: string,
  ): Promise<Ad> {
    return modelToObject(await this.adService.findAdByIdentifier(identifier));
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

  @Query(() => Int)
  async countAllAds(@Args() queryParameters: QueryParameters): Promise<number> {
    return this.adService.count(queryParameters);
  }

  @Query(() => Int)
  async estimatedCount(): Promise<number> {
    return this.adService.estimatedCount();
  }

  @Mutation(() => Ad)
  async createAd(
    @Args() adInput: AdInput,
    @CurrentUser() user: User,
  ): Promise<Ad> {
    return modelToObject(await this.adService.createAd(adInput, user.id));
  }

  @Mutation(() => Ad)
  async updateAd(
    @Args('id') id: string,
    @Args() adUpdate: AdUpdate,
  ): Promise<Ad> {
    return modelToObject(await this.adService.updateAd(id, adUpdate));
  }
}
