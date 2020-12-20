import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from './user.schema';
import { UserInput } from './user.input';
import { hashPassword } from 'src/util/util-functions';
import { UserUpdate } from './user.update';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  async findAllUsers(): Promise<UserModel[]> {
    const getUsers = this.userModel.find().exec();
    return getUsers;
  }

  async findOneUserById(id: string): Promise<UserModel> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
      });
    }
    return user;
  }

  async findOneUserByEmail(email: string): Promise<UserModel> {
    const user = this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
      });
    }
    return user;
  }

  async createUser(userInput: UserInput): Promise<UserModel> {
    const newUser = {
      password: hashPassword(userInput.password),
      email: userInput.email,
    };
    const createdUser = new this.userModel(newUser);
    return createdUser.save();
  }

  async updateUser(userUpdate: UserUpdate): Promise<UserModel> {
    return null;
  }

  async getUser(): Promise<UserModel> {
    const getUser = this.userModel.findOne().exec();
    return getUser;
  }
}
