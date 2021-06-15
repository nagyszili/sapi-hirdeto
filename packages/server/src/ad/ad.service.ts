import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
  UnauthorizedException,
} from '@nestjs/common';
import { AdModel } from './ad.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdInput } from './ad.input';
import { generateIdentifier } from 'src/util/util-functions';
import { UserService } from 'src/user/user.service';
import { CategoryService } from 'src/category/category.service';
import { QueryParameters } from 'src/util/graphql-util-types/QueryParameters';
import {
  ATTRIBUTE_TYPES,
  ERROR_CODES,
  ROLES,
  STATUS,
} from 'src/util/constants';
import { AttributeValueModel } from 'src/attribute-value/attribute-value.schema';
import { Ad } from './ad.type';
import { AdQueryService } from './ad-query.builder';
import { FileUpload } from 'graphql-upload';
import { ImageUploader, IMAGE_UPLOADER } from 'src/uploader/image-uploader';
import { AttributeValueInput } from 'src/attribute-value/attribute-value.input';
import { PagingArguments } from 'src/util/graphql-util-types/PagingArguments';
import { ImageModel } from './image/image.schema';
import { AdUpdate } from './ad.update';
import { User } from 'src/user/user.type';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class AdService {
  constructor(
    @InjectModel(AdModel.name) private adModel: Model<AdModel>,
    @InjectModel(AttributeValueModel.name)
    private attributeValueModel: Model<AttributeValueModel>,
    @InjectModel(ImageModel.name)
    private imageModel: Model<ImageModel>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private categoryService: CategoryService,
    private adQueryService: AdQueryService,
    @Inject(IMAGE_UPLOADER)
    private imageUploader: ImageUploader,
  ) {}

  async count(queryParameters: QueryParameters): Promise<number> {
    const queryObject = await this.adQueryService.getBaseQuery(queryParameters);
    const count = await this.adModel.aggregate(queryObject).count('count');
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

  async countAdsByDate(fromDate: Date, toDate: Date): Promise<number> {
    const filter = {
      createdAt: {
        $gte: new Date(new Date(fromDate).setHours(0o0, 0o0, 0o0)),
        $lte: new Date(new Date(toDate)),
      },
    };

    const result = (await this.adModel.find(filter).countDocuments()) || 0;

    return result;
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

  async findAdsByIds(ids: string[]): Promise<AdModel[]> {
    return this.adModel
      .find({
        $and: [
          { _id: { $in: ids.map((id) => new ObjectId(id)) } },
          {
            $or: [{ status: STATUS.ACTIVE }, { status: STATUS.INACTIVE }],
          },
        ],
      })
      .populate('user')
      .exec();
  }

  async findFavoriteAdsByUser(id: string): Promise<AdModel[]> {
    return (await this.userService.findUserById(id)).favorites;
  }

  async findAdById(id: string): Promise<AdModel> {
    const ad = await this.adModel
      .findOne({
        $and: [{ _id: id }],
      })
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
    return ad;
  }

  async findAdByIdentifier(
    identifier: string,
    userId?: string,
  ): Promise<AdModel> {
    const ad = await this.adModel
      .findOne({
        $and: [
          { identifier },
          { $or: [{ status: STATUS.INACTIVE }, { status: STATUS.ACTIVE }] },
        ],
      })
      .populate({
        path: 'category',
      })
      .populate('user')
      .exec();
    if (ad.status === STATUS.INACTIVE && userId != ad.user.id) {
      throw new NotFoundException({
        message: 'Ad not found!',
        code: ERROR_CODES.AD.NOT_FOUND,
      });
    }
    if (!ad) {
      throw new NotFoundException({
        message: 'Ad not found!',
        code: ERROR_CODES.AD.NOT_FOUND,
      });
    }
    ++ad.views;
    return ad.save();
  }

  async findAdsByUser(
    userId: string,
    paging: PagingArguments,
  ): Promise<AdModel[]> {
    return this.adModel
      .find({
        $and: [
          { user: new ObjectId(userId) },
          { $or: [{ status: STATUS.ACTIVE }, { status: STATUS.INACTIVE }] },
        ],
      })
      .sort({ actualizedAt: -1 })
      .limit(paging.perPage)
      .skip(paging.page * paging.perPage)
      .populate({
        path: 'category',
      })
      .populate('user')
      .exec();
  }

  async createAd(adInput: AdInput, userId: string): Promise<AdModel> {
    const { thumbnail, images, ...rest } = adInput;

    const createdAd = new this.adModel({
      ...rest,
      images: [],
    });
    createdAd.identifier = generateIdentifier();
    if (thumbnail) {
      const image = new this.imageModel();
      image.url = await this.uploadImage(
        await thumbnail.image,
        'images',
        `${createdAd.id}_${generateIdentifier()}`,
      );
      image.priority = thumbnail.priority;
      createdAd.thumbnail = image;
    }

    if (images) {
      await Promise.all(
        images.map(async (imageInput) => {
          const name = `${createdAd.id}_${generateIdentifier()}`;
          const image = new this.imageModel();
          image.priority = imageInput.priority;
          image.url = await this.uploadImage(
            await imageInput.image,
            'hdimages',
            name,
          );
          createdAd.images.push(image);
        }),
      );
    }

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

  async updateAd(id: string, adUpdate: AdUpdate, user: User): Promise<AdModel> {
    const currentAd = await this.findAdById(id);

    if (currentAd.user.id === user.id || user.role === ROLES.MANAGER) {
      const { thumbnail, images, deletedImages, ...rest } = adUpdate;

      currentAd.set({ ...rest });
      if (currentAd.category.id !== adUpdate.categoryId) {
        const category = await this.categoryService.findCategoryById(
          adUpdate.categoryId,
        );
        currentAd.category = category;
      }

      if (thumbnail?.image) {
        currentAd.set({
          thumbnail: {
            url: await this.uploadImage(
              await thumbnail.image,
              'images',
              `${currentAd.id}_${generateIdentifier()}`,
            ),
            priority: thumbnail.priority,
          },
        });
      } else if (thumbnail?.url) {
        currentAd.set({
          thumbnail: {
            url: thumbnail.url,
            priority: thumbnail.priority,
          },
        });
      } else if (thumbnail === null) {
        currentAd.set({ thumbnail: null });
      }
      if (deletedImages) {
        currentAd.images = currentAd.images.filter(
          (image) => !deletedImages.includes(image.url),
        );

        // await Promise.all(
        //   deletedImages.map((deletedImage) =>
        //     this.deleteImageFromAWS(deletedImage),
        //   ),
        // );
      }

      if (images) {
        await Promise.all(
          images.map(async (imageInput) => {
            const name = `${currentAd.id}_${generateIdentifier()}`;
            const image = new this.imageModel();
            if (imageInput.url) {
              currentAd.images = currentAd.images.map((currentImage) =>
                currentImage.url === imageInput.url
                  ? currentImage.set({
                      ...currentImage,
                      priority: imageInput.priority,
                    })
                  : currentImage,
              );
            } else if (imageInput.image) {
              image.priority = imageInput.priority;
              image.url = await this.uploadImage(
                await imageInput.image,
                'hdimages',
                name,
              );
              currentAd.images.push(image);
            }
          }),
        );
      }

      return currentAd.save();
    } else {
      throw new UnauthorizedException({
        message: 'You cant modify this Ad.',
        code: ERROR_CODES.USER.UNAUTHORIZED,
      });
    }
  }

  async uploadImage(
    { createReadStream, filename, mimetype }: FileUpload,
    folder: string,
    key: string,
  ): Promise<string> {
    const filePath = `${folder}/${key}_${filename}`;

    const uploadStream = this.imageUploader.createUploadStream(
      filePath,
      mimetype,
    );
    createReadStream().pipe(uploadStream.writeStream);
    return uploadStream.link;
  }

  async deleteImageFromAWS(url: string) {
    const regexp = /hdimages.+|images.+/;
    const key = url.match(regexp);
    if (key[0]) {
      await this.imageUploader.deleteImage(key[0]);
    }
  }

  async setAdStatus(
    id: string,
    status: string,
    user: User,
    reasonOfDelete?: string,
  ): Promise<AdModel> {
    const ad = await this.findAdById(id);
    if (ad.user.id === user.id || user.role === ROLES.MANAGER) {
      if (status === 'DELETED' && reasonOfDelete) {
        ad.reasonOfDelete = reasonOfDelete;
      }
      ad.status = STATUS[status];
    } else {
      throw new UnauthorizedException({
        message: 'You cant edit this Ad status.',
        code: ERROR_CODES.USER.UNAUTHORIZED,
      });
    }

    return ad.save();
  }

  async actualizeAd(id: string, user: User): Promise<AdModel> {
    const ad = await this.findAdById(id);
    const diffBetweenDates =
      (new Date().getTime() - ad.actualizedAt.getTime()) / (1000 * 3600 * 24);

    if (
      diffBetweenDates >= 1 &&
      (ad.user.id == user.id || user.role == ROLES.MANAGER)
    ) {
      const actualizedAt = new Date();
      ad.actualizedAt = actualizedAt;
    } else {
      throw new UnauthorizedException({
        message: 'You are not eligible to actualize this Ad',
        code: ERROR_CODES.USER.UNAUTHORIZED,
      });
    }

    return ad.save();
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
