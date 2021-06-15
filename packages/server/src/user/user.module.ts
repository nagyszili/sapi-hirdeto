import { Module, forwardRef } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserModel, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { AdModule } from 'src/ad/ad.module';
import { AwsService } from 'src/uploader/aws/aws.service';
import { IMAGE_UPLOADER } from 'src/uploader/image-uploader';

@Module({
  imports: [
    forwardRef(() => AdModule),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema, collection: 'User' },
    ]),
  ],
  providers: [
    UserResolver,
    UserService,
    {
      useClass: AwsService,
      provide: IMAGE_UPLOADER,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
