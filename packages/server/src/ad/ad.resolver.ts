import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Ad } from './ad.type';
import { AdInput } from './ad.input';
import { AdService } from './ad.service';
import { modelToObject } from 'src/util/mappers';
import { AdUpdate } from './ad.update';
import { User } from 'src/user/user.type';
import { CurrentUser } from 'src/util/decorators';

@Resolver()
export class AdResolver {
  constructor(private adService: AdService) {}

  @Query(() => Ad)
  async findAdById(@Args('id') id: string): Promise<Ad> {
    return modelToObject(await this.adService.findAdById(id));
  }

  @Query(() => [Ad])
  async findAllAds(): Promise<Ad[]> {
    return (await this.adService.findAllAds()).map((ad) => modelToObject(ad));
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
