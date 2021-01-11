import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MainCategoryModel } from './main-category.schema';
import { MainCategoryInput } from './main-category.input';

@Injectable()
export class MainCategoryService {
  constructor(
    @InjectModel(MainCategoryModel.name)
    private mainCategoryModel: Model<MainCategoryModel>,
  ) {}

  async findAllMainCategories(): Promise<MainCategoryModel[]> {
    const ads = await this.mainCategoryModel.find().exec();
    return ads;
  }

  async findMainCategoryById(id: string): Promise<MainCategoryModel> {
    const mainCategory = await this.mainCategoryModel.findById(id).exec();
    if (!mainCategory) {
      throw new NotFoundException({
        message: 'Main Category not found!',
      });
    }
    return mainCategory;
  }

  async createMainCategory(
    mainCategoryInput: MainCategoryInput,
  ): Promise<MainCategoryModel> {
    const mainCategory = new this.mainCategoryModel(mainCategoryInput);
    return mainCategory.save();
  }

  async updateMainCategory(
    id: string,
    mainCategoryInput: MainCategoryInput,
  ): Promise<MainCategoryModel> {
    const mainCategory = await this.findMainCategoryById(id);
    mainCategory.set({ ...mainCategoryInput });
    return mainCategory.save();
  }
}
