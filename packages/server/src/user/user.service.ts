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

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
    @Inject(forwardRef(() => AdService))
    private adService: AdService,
  ) {}

  async getUser(): Promise<UserModel> {
    const getUser = await this.userModel.findOne().exec();
    return getUser;
  }

  async findAllUsers(): Promise<UserModel[]> {
    const getUsers = await this.userModel.find().exec();
    return getUsers;
  }

  async findUserById(id: string): Promise<UserModel> {
    const user = await this.userModel.findById(id).populate('favorites').exec();
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
    currentUser.set({ ...userUpdate });
    return currentUser.save();
  }

  async addAdToFavorites(adId: string, userId: string): Promise<UserModel> {
    const user = await this.findUserById(userId);
    const ad = await this.adService.findAdById(adId);
    if (user.favorites.find((favorite) => favorite.id === adId)) {
      user.favorites = user.favorites.filter(
        (favorite) => favorite.id !== adId,
      );
      return user.save();
    }
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
