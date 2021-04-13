import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'src/config/config';
import { modelToObject } from 'src/util/mappers';
import { User } from 'src/user/user.type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleBasedJwtStrategy extends PassportStrategy(
  Strategy,
  'role-jwt',
) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.get('jwtSecret'),
    });
  }

  async validate(payload: any): Promise<User> {
    const { userId } = payload;
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid access token!');
    }

    return modelToObject(user);
  }
}
