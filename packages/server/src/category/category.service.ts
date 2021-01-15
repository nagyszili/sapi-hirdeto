import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryModel } from './category.schema';
import { Model } from 'mongoose';
import { CategoryInput } from './category.input';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryModel.name)
    private categoryModel: Model<CategoryModel>,
  ) {}

  async findAllCategories(): Promise<CategoryModel[]> {
    return this.categoryModel.find().populate('mainCategory').exec();
  }

  async findCategoryById(id: string): Promise<CategoryModel> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException({
        message: 'Category not found!',
      });
    }
    return category;
  }

  async findCategoriesByMainCategoryId(id: string): Promise<CategoryModel[]> {
    return this.categoryModel
      .find({ mainCategory: new ObjectId(id) })
      .populate('mainCategory')
      .exec();
  }

  createCategory(categoryInput: CategoryInput): Promise<CategoryModel> {
    const category = new this.categoryModel(categoryInput);
    return category.save();
  }
}
