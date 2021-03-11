import { Injectable } from '@nestjs/common';
import { AdModel } from 'src/ad/ad.schema';
import { UserModel } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { generateIdentifier } from 'src/util/util-functions';
import { MainCategoryMock } from './mock-data/main-category.mock';
import { MainCategoryInput } from 'src/main-category/main-category.input';
import { MainCategoryModel } from 'src/main-category/main-category.schema';
import { CategoryModel } from 'src/category/category.schema';
import { CategoryMock } from './mock-data/categories.mock';
import { CategoryInput } from 'src/category/category.input';
import { LocationModel } from 'src/location/locations.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;
import { LocationInput } from 'src/location/location.input';

import * as locations from '../../assets/locations.json';
import { CURRENCY, ATTRIBUTE_TYPES } from 'src/util/constants';
import { AttributeValueModel } from 'src/attribute-value/attribute-value.schema';
import { AdMock } from './mock-data/ad.mock';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(CategoryModel.name)
    private categoryModel: Model<CategoryModel>,
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
    @InjectModel(AdModel.name) private adModel: Model<AdModel>,
    @InjectModel(MainCategoryModel.name)
    private mainCategoryModel: Model<MainCategoryModel>,
    @InjectModel(LocationModel.name)
    private locationModel: Model<LocationModel>,
    @InjectModel(AttributeValueModel.name)
    private attributeValueModel: Model<AttributeValueModel>,
  ) {}

  async seedMainCategories(): Promise<void> {
    try {
      await this.mainCategories(MainCategoryMock);
    } catch (error) {
      console.warn('Main Category seed error!', error);
      Promise.reject(error);
    }
  }

  async seedCategories(): Promise<void> {
    try {
      await this.categories(CategoryMock);
    } catch (error) {
      console.warn('Category seed error!', error);
      Promise.reject(error);
    }
  }

  async seedAds(): Promise<void> {
    const users = await this.userModel.find().exec();
    const categories = await this.categoryModel.find().exec();
    const countLocations = await this.locationModel.estimatedDocumentCount();

    console.log('Seeding ads');
    await this.seedAdsFromMock(users);

    categories.forEach(async (category) => {
      for (let i = 0; i < 1000; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const createdAt = this.randomDate(new Date(2020, 0, 1), new Date());
        const location = await this.locationModel
          .find()
          .limit(-1)
          .skip(Math.floor(Math.random() * countLocations) + 1)
          .exec();

        const currency = i % 2 === 0 ? CURRENCY.EURO : CURRENCY.LEI;
        const attributeValues: AttributeValueModel[] = [];
        let name = category.name + ': ';
        category.attributes.forEach((attribute) => {
          const newAttributeValue = new this.attributeValueModel();
          newAttributeValue.key = attribute.title;
          if (attribute.type === ATTRIBUTE_TYPES.RANGE) {
            if (attribute.title.includes('year')) {
              newAttributeValue.value =
                Math.floor(Math.random() * (1 + 2020 - 1900)) + 1900;
            } else {
              newAttributeValue.value = Math.floor(Math.random() * 10000) + 1;
            }
          } else {
            if (attribute.dependsBy) {
              const dependsBy = attributeValues.find(
                (attributeValue) => attributeValue.key === attribute.dependsBy,
              );
              const dependingValues = attribute.possibleValues.find(
                (possibleValue) =>
                  possibleValue.dependingKey === dependsBy.value,
              );
              if (dependsBy && dependingValues) {
                newAttributeValue.value =
                  dependingValues.values[
                    Math.floor(
                      Math.random() * dependingValues.values.length - 1,
                    ) + 1
                  ];
              }
            } else {
              newAttributeValue.value =
                attribute.possibleValues[0].values[
                  Math.floor(
                    Math.random() * attribute.possibleValues[0].values.length -
                      1,
                  ) + 1
                ];
            }
          }
          attributeValues.push(newAttributeValue);
          name = name.concat(
            attribute.title + ' ' + newAttributeValue.value + ' ',
          );
        });

        await this.createAd(
          name,
          randomUser,
          category,
          createdAt,
          location[0],
          currency,
          attributeValues,
        );
      }
    });
  }

  private async seedAdsFromMock(users: UserModel[]): Promise<void> {
    AdMock.forEach(async (ad) => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const newAd = new this.adModel(ad);
      const categories = await this.categoryModel.find().exec();
      const category = categories.find(
        (category) => category.identifier === ad.categoryId,
      );
      newAd.identifier = generateIdentifier();
      newAd.category = new ObjectId(category.id);
      newAd.user = randomUser;
      await newAd.save();
    });
  }

  private async createAd(
    name: string,
    user: UserModel,
    category: CategoryModel,
    createdAt: Date,
    location: LocationModel,
    currency: string,
    attributeValues: AttributeValueModel[],
  ): Promise<AdModel> {
    const randomViews = Math.floor(Math.random() * 10000) + 1;
    const randomPrice = Math.floor(Math.random() * 100000) + 1;
    const newAd = new this.adModel();
    newAd.name = name;
    newAd.description =
      name + ',\n ' + name + ',\n ' + name + ',\n' + name + ',\n ' + name;
    newAd.user = user;
    newAd.createdAt = createdAt;
    newAd.views = randomViews;
    newAd.identifier = generateIdentifier();
    newAd.category = new ObjectId(category.id);
    newAd.location = location;
    newAd.currency = currency;
    newAd.price = randomPrice;
    newAd.attributeValues = attributeValues;

    return newAd.save();
  }

  async seedLocations(): Promise<void> {
    console.log('Seed locations');

    locations.forEach(async (loc) => {
      await this.createLocation(loc);
    });
  }

  private async createLocation(
    location: LocationInput,
  ): Promise<LocationModel> {
    const newLocation = new this.locationModel(location);
    return newLocation.save();
  }

  private async mainCategories(
    mainCategories: MainCategoryInput[],
  ): Promise<void> {
    console.log('Seeding main categories');
    for (let i = 0; i < mainCategories.length; i++) {
      const category = mainCategories[i];
      if (!(await this.mainCategoryModel.findOne({ name: category.name }))) {
        await new this.mainCategoryModel(category).save();
      }
    }
  }

  private async categories(categories: CategoryInput[]): Promise<void> {
    console.log('Seeding categories');

    categories.forEach(async (category) => {
      const mainCategory = await this.mainCategoryModel
        .findOne({ identifier: category.mainCategoryId })
        .exec();

      if (mainCategory) {
        const newCategory = await new this.categoryModel(category);
        newCategory.mainCategory = mainCategory;
        newCategory.save();
      } else {
        console.warn('Wrong MainCategory identifier in categories mock!');
      }
    });

    return null;
  }

  private randomDate(start: Date, end: Date): Date {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  }
}
