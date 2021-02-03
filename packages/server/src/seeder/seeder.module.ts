import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdModel, AdSchema } from 'src/ad/ad.schema';
import {
  MainCategoryModel,
  MainCategorySchema,
} from 'src/main-category/main-category.schema';
import { UserSchema, UserModel } from 'src/user/user.schema';
import { CategoryModel, CategorySchema } from 'src/category/category.schema';
import { LocationModel, LocationSchema } from 'src/location/locations.schema';
import {
  AttributeValueModel,
  AttributeValueSchema,
} from 'src/attribute-value/attribute-value.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
        collection: 'User',
      },
    ]),
    MongooseModule.forFeature([
      {
        name: CategoryModel.name,
        schema: CategorySchema,
        collection: 'Category',
      },
    ]),
    MongooseModule.forFeature([
      { name: AdModel.name, schema: AdSchema, collection: 'Ad' },
    ]),
    MongooseModule.forFeature([
      {
        name: LocationModel.name,
        schema: LocationSchema,
        collection: 'Location',
      },
    ]),
    MongooseModule.forFeature([
      {
        name: AttributeValueModel.name,
        schema: AttributeValueSchema,
        collection: 'AttributeValue',
      },
    ]),
    MongooseModule.forFeature([
      {
        name: MainCategoryModel.name,
        schema: MainCategorySchema,
        collection: 'MainCategory',
      },
    ]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
