import { Resolver, Query, Int, Args } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { mapModelsToObject } from 'src/util/mappers';
import { Location } from './location.type';
import { LocationQueryType } from './location-query.type';

@Resolver()
export class LocationResolver {
  constructor(private locationService: LocationService) {}

  @Query(() => Int)
  async countLocations(): Promise<number> {
    return this.locationService.count();
  }

  @Query(() => [Location])
  async allLocations(): Promise<Location[]> {
    return mapModelsToObject(await this.locationService.allLocations());
  }

  @Query(() => [String])
  async allCounties(): Promise<string[]> {
    return this.locationService.allCounties();
  }

  @Query(() => [LocationQueryType])
  async findLocationsByName(
    @Args('name') name: string,
    @Args('limit', { type: () => Int }) limit: number,
  ): Promise<LocationQueryType[]> {
    return this.locationService.findLocationsByName(name, limit);
  }

  @Query(() => [Location])
  async findLocationsByCounty(
    @Args('county') county: string,
  ): Promise<Location[]> {
    return mapModelsToObject(
      await this.locationService.findLocationsByCounty(county),
    );
  }
}
