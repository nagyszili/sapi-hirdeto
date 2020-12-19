import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from './user.schema';
import { UserInput } from './user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  async findAllUsers(): Promise<UserModel[]> {
    const getUsers = this.userModel.find().exec();
    return getUsers;
  }

  async createUser(userInput: UserInput): Promise<UserModel> {
    const newUser = new this.userModel(userInput);

    return newUser.save();
  }

  async getUser(): Promise<UserModel> {
    const getUser = this.userModel.findOne().exec();
    return getUser;
  }
}
