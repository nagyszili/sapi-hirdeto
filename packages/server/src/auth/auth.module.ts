import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { config } from 'src/config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema, collection: 'User' },
    ]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: config.get('jwtSecret'),
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
