import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationModel, LocationSchema } from './locations.schema';
import { LocationService } from './location.service';
import { LocationResolver } from './location.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LocationModel.name,
        schema: LocationSchema,
        collection: 'Location',
      },
    ]),
  ],
  providers: [LocationResolver, LocationService],
  exports: [LocationService],
})
export class LocationModule {}
