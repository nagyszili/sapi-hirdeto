import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LocationModel } from './locations.schema';
import { Model } from 'mongoose';
import { LocationQueryType } from './location-query.type';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(LocationModel.name)
    private locationModel: Model<LocationModel>,
  ) {}

  async count(): Promise<number> {
    return this.locationModel.estimatedDocumentCount();
  }

  async allLocations(): Promise<LocationModel[]> {
    return this.locationModel.find().exec();
  }

  async allCounties(): Promise<string[]> {
    return this.locationModel.distinct('county').exec();
  }

  async findLocationsByCounty(county: string): Promise<LocationModel[]> {
    return this.locationModel.find({ county }).exec();
  }

  async findLocationsByName(
    name: string,
    limit: number,
  ): Promise<LocationQueryType[]> {
    const counties = await this.allCounties();
    const regexp = new RegExp(`^${name}`, 'i');
    const matchedCounties: LocationQueryType[] = counties
      .filter((county) => county.match(regexp))
      .map((county) => ({ type: 'county', name: county }));

    const locations =
      limit - matchedCounties.length > 0
        ? await this.locationModel
            .find({
              name: regexp,
            })
            .limit(limit - matchedCounties.length)
            .exec()
        : [];

    const result = matchedCounties.concat(
      locations.map((location) => ({
        type: 'location',
        name: location.name,
        county: location.county,
      })),
    );

    return result;
  }
}
