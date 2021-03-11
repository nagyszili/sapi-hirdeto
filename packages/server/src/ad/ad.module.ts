import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdModel, AdSchema } from './ad.schema';
import { AdResolver } from './ad.resolver';
import { AdService } from './ad.service';
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';
import {
  AttributeValueModel,
  AttributeValueSchema,
} from 'src/attribute-value/attribute-value.schema';
import { AdQueryService } from './ad-query.builder';
import { AwsService } from 'src/uploader/aws/aws.service';
import { IMAGE_UPLOADER } from 'src/uploader/image-uploader';

@Module({
  imports: [
    forwardRef(() => UserModule),
    CategoryModule,
    MongooseModule.forFeature([
      { name: AdModel.name, schema: AdSchema, collection: 'Ad' },
    ]),
    MongooseModule.forFeature([
      {
        name: AttributeValueModel.name,
        schema: AttributeValueSchema,
        collection: 'AttributeValue',
      },
    ]),
  ],
  providers: [
    AdResolver,
    AdService,
    AdQueryService,
    {
      useClass: AwsService,
      provide: IMAGE_UPLOADER,
    },
  ],
  exports: [AdService],
})
export class AdModule {}
