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

  async findAllAds(): Promise<AdModel[]> {
    return this.adModel
      .find()
      .populate({
        path: 'category',
        populate: {
          path: 'mainCategory',
        },
      })
      .populate('user')
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

  async findAdsByCategoryId(id: string): Promise<AdModel[]> {
    const ads = await this.adModel
      .find({ category: new ObjectId(id) })
      .populate({
        path: 'category',
        populate: {
          path: 'mainCategory',
        },
      })
      .populate('user')
      .exec();
    return ads;
  }

  async findAdsByMainCategoryId(id: string): Promise<AdModel[]> {
    const categories = await this.categoryService.findCategoriesByMainCategoryId(
      id,
    );
    const ads = await this.adModel
      .find({
        category: {
          $in: categories.map((category) => new ObjectId(category.id)),
        },
      })
      .populate({
        path: 'category',
        populate: {
          path: 'mainCategory',
        },
      })
      .populate('user')
      .exec();
    return ads;
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
}
