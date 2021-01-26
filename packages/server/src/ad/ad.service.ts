import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { AdModel } from './ad.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdInput } from './ad.input';
import { generateIdentifier } from 'src/util/util-functions';
import { AdUpdate } from './ad.update';
import { UserService } from 'src/user/user.service';
import { CategoryService } from 'src/category/category.service';
import { QueryParameters } from 'src/util/graphql-util-types/QueryParameters';
import { ATTRIBUTE_TYPES } from 'src/util/constants';
import { Filter } from 'src/util/graphql-util-types/Filter';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class AdService {
  constructor(
    @InjectModel(AdModel.name) private adModel: Model<AdModel>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private categoryService: CategoryService,
  ) {}

  async count(queryParameters: QueryParameters): Promise<number> {
    const queryObject = await this.createQueryObject(queryParameters);
    return this.adModel.countDocuments(queryObject);
  }

  async findAllAds(queryParameters: QueryParameters): Promise<AdModel[]> {
    const queryObject = await this.createQueryObject(queryParameters);
    return this.adModel
      .find(queryObject)
      .populate({
        path: 'category',
        populate: {
          path: 'mainCategory',
        },
      })
      .populate('user')
      .sort({ [queryParameters.sortField]: queryParameters.sortOrder })
      .limit(queryParameters.perPage)
      .skip(queryParameters.page * queryParameters.perPage)
      .exec();
  }

  async findAdById(id: string): Promise<AdModel> {
    const ad = await this.adModel.findById(id).exec();
    if (!ad) {
      throw new NotFoundException({
        message: 'Ad not found!',
      });
    }
    return ad;
  }

  async createAd(adInput: AdInput, userId: string): Promise<AdModel> {
    const createdAd = new this.adModel(adInput);
    const user = await this.userService.findUserById(userId);
    createdAd.user = user;
    createdAd.identifier = generateIdentifier();
    return createdAd.save();
  }

  async updateAd(id: string, adUpdate: AdUpdate): Promise<AdModel> {
    const currentAd = await this.findAdById(id);
    currentAd.set({ ...adUpdate });
    return currentAd.save();
  }

  async createQueryObject(queryParameters: QueryParameters) {
    const categories = queryParameters.mainCategoryId
      ? await this.categoryService.findCategoriesByMainCategoryId(
          queryParameters.mainCategoryId,
        )
      : [];

    return {
      $and: [
        queryParameters.categoryId
          ? { category: new ObjectId(queryParameters.categoryId) }
          : queryParameters.mainCategoryId
          ? {
              category: {
                $in: categories.map((category) => new ObjectId(category.id)),
              },
            }
          : {},
        queryParameters.queryString
          ? queryParameters.inDescription
            ? {
                description: {
                  $regex: queryParameters.queryString,
                  $options: 'xi',
                },
              }
            : {
                name: { $regex: queryParameters.queryString, $options: 'xi' },
              }
          : {},
        queryParameters.filters && queryParameters.filters.length > 0
          ? this.createFilterObject(queryParameters.filters)
          : {},
      ],
    };
  }

  createFilterObject(filters: Filter[]) {
    return {
      $and: filters.map((filter) => {
        switch (filter.type) {
          case ATTRIBUTE_TYPES.RANGE: {
            return {
              $and: [
                { [filter.name]: { $gte: filter.from } },
                { [filter.name]: { $lte: filter.to } },
              ],
            };
          }

          case ATTRIBUTE_TYPES.SELECT:
          case ATTRIBUTE_TYPES.MULTI_SELECT:
          case ATTRIBUTE_TYPES.CHECKBOX: {
            return {
              attributeValues: {
                $elemMatch: {
                  key: filter.name,
                  value: {
                    $in: filter.selectedAttributeValues,
                  },
                },
              },
            };
          }
        }
      }),
    };
  }
}
