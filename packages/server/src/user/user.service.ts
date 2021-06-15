import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from './user.schema';
import { UserInput } from './user.input';
import { hashPassword } from 'src/util/util-functions';
import { UserUpdate } from './user.update';
import { LOGIN_TYPES, ERROR_CODES } from 'src/util/constants';
import { AdService } from 'src/ad/ad.service';
import { FileUpload } from 'graphql-upload';
import { IMAGE_UPLOADER, ImageUploader } from 'src/uploader/image-uploader';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
    @Inject(forwardRef(() => AdService))
    private adService: AdService,
    @Inject(IMAGE_UPLOADER)
    private imageUploader: ImageUploader,
  ) {}

  async findAllUsers(): Promise<UserModel[]> {
    const getUsers = await this.userModel.find().exec();
    return getUsers;
  }

  async countUsersByDate(fromDate: Date, toDate: Date): Promise<number> {
    const filter = {
      createdAt: {
        $gte: new Date(new Date(fromDate).setHours(0o0, 0o0, 0o0)),
        $lte: new Date(new Date(toDate)),
      },
    };

    const result = (await this.userModel.find(filter).countDocuments()) || 0;

    return result;
  }

  async findUserById(id: string): Promise<UserModel> {
    const user = await this.userModel
      .findById(id)
      .populate({ path: 'favorites', populate: ['user'] })
      .exec();
    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
        code: ERROR_CODES.USER.NOT_FOUND,
      });
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<UserModel> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
        code: ERROR_CODES.USER.NOT_FOUND,
      });
    }
    return user;
  }

  async createUser(userInput: UserInput): Promise<UserModel> {
    await this.checkIfEmailAlreadyExists(userInput.email);
    const newUser = {
      password: hashPassword(userInput.password),
      email: userInput.email,
      loginType: LOGIN_TYPES.PASSWORD,
    };
    const createdUser = new this.userModel(newUser);
    return createdUser.save();
  }

  async updateUser(userId: string, userUpdate: UserUpdate): Promise<UserModel> {
    const currentUser = await this.findUserById(userId);
    const { profilePicture, ...rest } = userUpdate;

    currentUser.set({ ...rest });

    if (profilePicture) {
      currentUser.profilePictureUrl = await this.uploadProfilePicture(
        await profilePicture,
        currentUser.id,
      );
    }

    return currentUser.save();
  }

  async uploadProfilePicture(
    { createReadStream, mimetype }: FileUpload,
    key: string,
  ): Promise<string> {
    const filePath = `profilePics/${key}_${Date.now()}`;

    const uploadStream = this.imageUploader.createUploadStream(
      filePath,
      mimetype,
    );
    createReadStream().pipe(uploadStream.writeStream);
    return uploadStream.link;
  }

  async addAdToFavorites(adId: string, userId: string): Promise<UserModel> {
    const user = await this.findUserById(userId);
    if (user.favorites.find((favorite) => favorite.id === adId)) {
      user.favorites = user.favorites.filter(
        (favorite) => favorite.id !== adId,
      );
      return user.save();
    }
    const ad = await this.adService.findAdById(adId);
    user.favorites.push(ad);
    return user.save();
  }

  async checkIfEmailAlreadyExists(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user) {
      throw new ConflictException({
        message: 'This email address is already used!',
        code: ERROR_CODES.USER.EMAIL_ALREADY_USED,
      });
    }
  }
}
