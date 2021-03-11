import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryModel } from './category.schema';
import { Model } from 'mongoose';
import { CategoryInput } from './category.input';
import { ERROR_CODES } from 'src/util/constants';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryModel.name)
    private categoryModel: Model<CategoryModel>,
  ) {}

  async findAllCategories(): Promise<CategoryModel[]> {
    return this.categoryModel.find().exec();
  }

  async findCategoryById(id: string): Promise<CategoryModel> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException({
        message: 'Category not found!',
        code: ERROR_CODES.CATEGORY.NOT_FOUND,
      });
    }
    return category;
  }

  async findCategoryByIdentifier(identifier: string): Promise<CategoryModel> {
    const category = await this.categoryModel.findOne({ identifier }).exec();
    if (!category) {
      throw new NotFoundException({
        message: 'Category not found!',
        code: ERROR_CODES.CATEGORY.NOT_FOUND,
      });
    }
    return category;
  }

  async findCategoriesByMainCategoryIdentifier(
    identifier: string,
  ): Promise<CategoryModel[]> {
    if (identifier === '') {
      return [];
    }
    return await this.categoryModel
      .find({ 'mainCategory.identifier': identifier })
      .exec();
  }

  async findCategoriesByMainCategoryId(id: string): Promise<CategoryModel[]> {
    if (id === '') {
      return [];
    }
    return this.categoryModel.find({ mainCategory: new ObjectId(id) }).exec();
  }

  createCategory(categoryInput: CategoryInput): Promise<CategoryModel> {
    const category = new this.categoryModel(categoryInput);
    return category.save();
  }
}
