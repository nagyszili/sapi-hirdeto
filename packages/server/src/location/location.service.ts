import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LocationModel } from './locations.schema';
import { Model } from 'mongoose';

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

  async findLocationsByName(name: string): Promise<LocationModel[]> {
    return this.locationModel
      .find({
        name: { $regex: name, $options: 'xi' },
      })
      .exec();
  }
}
