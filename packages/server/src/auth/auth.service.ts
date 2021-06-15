import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/user/user.schema';
import { AccessToken } from './token.type';
import { JwtService } from '@nestjs/jwt';
import { ERROR_CODES, LOGIN_TYPES } from 'src/util/constants';
import { OAuth2Client } from 'google-auth-library';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { config } from 'src/config/config';

@Injectable()
export class AuthService {
  private client: OAuth2Client = new OAuth2Client();
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  async validateUser(email: string, password: string): Promise<UserModel> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException({
        message: 'Bad login credentials!',
        code: ERROR_CODES.USER.BAD_CREDENTIALS,
      });
    }
    return user;
  }

  async login(email: string, password: string): Promise<AccessToken> {
    const user = await this.validateUser(email, password);
    const payload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginGoogle(idToken: string): Promise<AccessToken> {
    const user = await this.authorizeGoogleUser(idToken);
    return {
      access_token: this.jwtService.sign({ userId: user.id }),
    };
  }

  async loginFacebook(accessToken: string): Promise<AccessToken> {
    const user = await this.authorizeFacebookUser(accessToken);
    return {
      access_token: this.jwtService.sign({ userId: user.id }),
    };
  }

  async authorizeGoogleUser(idToken: string): Promise<UserModel> {
    const ticket = await this.client.verifyIdToken({
      idToken,
    });
    const payload = ticket.getPayload();
    const googleId = payload.sub;
    const email = payload.email;
    let user = await this.userModel.findOne({ googleId });

    if (!user) {
      user = await this.userModel.findOne({ email });

      if (user) {
        throw new ConflictException({
          message: 'User with this email already exists!',
          code: ERROR_CODES.USER.EMAIL_ALREADY_USED,
        });
      }

      user = new this.userModel({
        loginType: LOGIN_TYPES.GOOGLE,
        email,
        googleId,
        name: `${payload.family_name || ''} ${payload.given_name || ''}`,
      });
      await user.save();
    }
    return user;
  }

  async authorizeFacebookUser(accessToken: string): Promise<UserModel> {
    const { data } = await axios({
      url: config.get('facebookUrl'),
      method: 'get',
      params: {
        fields: ['id', 'email', 'name'].join(','),
        access_token: accessToken,
      },
    });

    const { data: picture } = await axios({
      url: `${config.get('facebookUrl')}/picture`,
      method: 'get',
      params: {
        access_token: accessToken,
        redirect: false,
      },
    });

    let user = await this.userModel.findOne({ facebookId: data.id });
    if (!user) {
      user = await this.userModel.findOne({ email: data.email });
      if (user) {
        throw new ConflictException({
          message: 'User with this email already exists!',
          code: ERROR_CODES.USER.EMAIL_ALREADY_USED,
        });
      }

      user = new this.userModel({
        loginType: LOGIN_TYPES.FACEBOOK,
        email: data.email,
        facebookId: data.id,
        name: data.name,
      });
    }

    // if (picture) {
    //   user.profilePictureUrl = picture;
    // }

    return user.save();
  }
}
