import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserModel, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema, collection: 'User' },
    ]),
  ],
  providers: [UserResolver, UserService],
  exports: [],
})
export class UserModule {}
