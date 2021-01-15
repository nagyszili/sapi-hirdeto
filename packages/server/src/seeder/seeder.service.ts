import { Injectable } from '@nestjs/common';
import { AdInput } from 'src/ad/ad.input';
import { AdMock } from './mock-data/ad.mock';
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
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(CategoryModel.name)
    private categoryModel: Model<CategoryModel>,
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
    @InjectModel(AdModel.name) private adModel: Model<AdModel>,
    @InjectModel(MainCategoryModel.name)
    private mainCategoryModel: Model<MainCategoryModel>,
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
    const createdAt = this.randomDate(new Date(2020, 0, 1), new Date());
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomViews = Math.floor(Math.random() * 500) + 1;
    const categories = await this.categoryModel.find().exec();

    console.log('Seeding ads');

    AdMock.forEach(async (ad) => {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      await this.createAd(
        ad,
        randomUser,
        randomCategory,
        createdAt,
        randomViews,
      );
    });
  }

  private async createAd(
    ad: AdInput,
    user: UserModel,
    category: CategoryModel,
    createdAt: Date,
    views: number,
  ): Promise<AdModel> {
    const newAd = new this.adModel(ad);
    newAd.user = user;
    newAd.createdAt = createdAt;
    newAd.views = views;
    newAd.identifier = generateIdentifier();
    newAd.category = new ObjectId(category.id);

    return newAd.save();
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
