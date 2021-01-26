import { Resolver, Query, Int, Args } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { mapModelsToObject } from 'src/util/mappers';
import { Location } from './location.type';

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

  @Query(() => [Location])
  async findLocationsByName(@Args('name') name: string): Promise<Location[]> {
    return mapModelsToObject(
      await this.locationService.findLocationsByName(name),
    );
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
