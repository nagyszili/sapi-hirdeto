import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/user/user.schema';
import { AccessToken } from './token.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserModel> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException({
        message: 'Bad login credentials!',
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
}
