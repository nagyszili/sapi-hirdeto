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

@Injectable()
export class AdService {
  constructor(
    @InjectModel(AdModel.name) private adModel: Model<AdModel>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async findAllAds(): Promise<AdModel[]> {
    return this.adModel.find().exec();
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
    createdAd.createdAt = new Date();
    return createdAd.save();
  }

  async updateAd(id: string, adUpdate: AdUpdate): Promise<AdModel> {
    const currentAd = await this.findAdById(id);
    currentAd.set({ ...adUpdate });
    currentAd.updatedAt = new Date();
    return currentAd.save();
  }
}
