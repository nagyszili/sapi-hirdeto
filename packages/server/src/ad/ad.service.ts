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
import { ATTRIBUTE_TYPES, ERROR_CODES } from 'src/util/constants';
import { AttributeValueModel } from 'src/attribute-value/attribute-value.schema';
import { Ad } from './ad.type';
import { AdQueryService } from './ad-query.builder';
import { FileUpload } from 'graphql-upload';
import { ImageUploader, IMAGE_UPLOADER } from 'src/uploader/image-uploader';
import { AttributeValueInput } from 'src/attribute-value/attribute-value.input';

@Injectable()
export class AdService {
  constructor(
    @InjectModel(AdModel.name) private adModel: Model<AdModel>,
    @InjectModel(AttributeValueModel.name)
    private attributeValueModel: Model<AttributeValueModel>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private categoryService: CategoryService,
    private adQueryService: AdQueryService,
    @Inject(IMAGE_UPLOADER)
    private imageUploader: ImageUploader,
  ) {}

  async count(queryParameters: QueryParameters): Promise<number> {
    const queryObject = await this.adQueryService.getBaseQuery(queryParameters);
    const count: any[] = await this.adModel
      .aggregate(queryObject)
      .count('count');
    if (!count || !count[0] || !count[0].count) {
      throw new NotFoundException({
        message: 'Count not found!',
        code: ERROR_CODES.AD.NOT_FOUND_COUNT,
      });
    }
    return count[0].count;
  }

  async estimatedCount(): Promise<number> {
    return this.adModel.estimatedDocumentCount();
  }

  async findAllAds(queryParameters: QueryParameters): Promise<Ad[]> {
    const queryObject = await this.adQueryService.getAdsQuery(queryParameters);
    const ads = await this.adModel.aggregate(queryObject).exec();
    if (!ads) {
      throw new NotFoundException({
        message: 'Ad not found!',
        code: ERROR_CODES.AD.NOT_FOUND,
      });
    }
    return ads;
  }
  async findAdById(id: string): Promise<AdModel> {
    const ad = await this.adModel.findById(id).exec();
    if (!ad) {
      throw new NotFoundException({
        message: 'Ad not found!',
        code: ERROR_CODES.AD.NOT_FOUND,
      });
    }
    return ad;
  }

  async findAdByIdentifier(identifier: string): Promise<AdModel> {
    const ad = await this.adModel
      .findOne({ identifier })
      .populate({
        path: 'category',
      })
      .populate('user')
      .exec();
    if (!ad) {
      throw new NotFoundException({
        message: 'Ad not found!',
        code: ERROR_CODES.AD.NOT_FOUND,
      });
    }
    ++ad.views;
    return ad.save();
  }

  async createAd(adInput: AdInput, userId: string): Promise<AdModel> {
    const createdAd = new this.adModel({
      ...adInput,
      images: [],
    });
    createdAd.identifier = generateIdentifier();

    await Promise.all(
      adInput.images.map(async (imageInput, index) => {
        const key = createdAd.id + '_' + index;
        const link = await this.uploadImageStream(await imageInput.image, key);
        createdAd.images.push(link);
        if (imageInput.isThumbnail) {
          createdAd.thumbnail = link;
        }
      }),
    );

    const user = await this.userService.findUserById(userId);
    const category = await this.categoryService.findCategoryById(
      adInput.categoryId,
    );
    createdAd.user = user;
    createdAd.category = category;
    createdAd.attributeValues = this.mapAttributeValueInputToAttributeValue(
      adInput.attributeValues,
    );
    return createdAd.save();
  }

  async updateAd(id: string, adUpdate: AdUpdate): Promise<AdModel> {
    const currentAd = await this.findAdById(id);
    currentAd.set({ ...adUpdate });
    return currentAd.save();
  }

  async uploadImageStream(
    { createReadStream, filename, mimetype }: FileUpload,
    key: string,
  ): Promise<string> {
    const filePath = key + '_' + filename;
    const uploadStream = this.imageUploader.createUploadStream(
      filePath,
      mimetype,
    );
    createReadStream().pipe(uploadStream.writeStream);
    return uploadStream.link;
  }

  mapAttributeValueInputToAttributeValue(
    attributeValueInputs: AttributeValueInput[],
  ) {
    return attributeValueInputs.map((attributeValue) =>
      attributeValue.type === ATTRIBUTE_TYPES.RANGE
        ? new this.attributeValueModel({
            key: attributeValue.key,
            value: parseInt(attributeValue.value, 10),
          })
        : new this.attributeValueModel({
            key: attributeValue.key,
            value: attributeValue.value,
          }),
    );
  }
}
