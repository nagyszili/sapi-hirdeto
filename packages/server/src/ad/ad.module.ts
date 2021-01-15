import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdModel, AdSchema } from './ad.schema';
import { AdResolver } from './ad.resolver';
import { AdService } from './ad.service';
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    CategoryModule,
    MongooseModule.forFeature([
      { name: AdModel.name, schema: AdSchema, collection: 'Ad' },
    ]),
  ],
  providers: [AdResolver, AdService],
  exports: [AdService],
})
export class AdModule {}
