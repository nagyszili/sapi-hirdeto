import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MainCategoryModel } from './main-category.schema';
import { MainCategoryInput } from './main-category.input';
import { ERROR_CODES } from 'src/util/constants';

@Injectable()
export class MainCategoryService {
  constructor(
    @InjectModel(MainCategoryModel.name)
    private mainCategoryModel: Model<MainCategoryModel>,
  ) {}

  async findAllMainCategories(): Promise<MainCategoryModel[]> {
    return this.mainCategoryModel.find().exec();
  }

  async findMainCategoryById(id: string): Promise<MainCategoryModel> {
    const mainCategory = await this.mainCategoryModel.findById(id).exec();
    if (!mainCategory) {
      throw new NotFoundException({
        message: 'Main Category not found!',
        code: ERROR_CODES.MAIN_CATEGORY.NOT_FOUND,
      });
    }
    return mainCategory;
  }

  async findMainCategoryByIdentifier(
    identifier: string,
  ): Promise<MainCategoryModel> {
    const mainCategory = await this.mainCategoryModel
      .findOne({ identifier })
      .exec();
    if (!mainCategory) {
      throw new NotFoundException({
        message: 'Main Category not found!',
        code: ERROR_CODES.MAIN_CATEGORY.NOT_FOUND,
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
}
