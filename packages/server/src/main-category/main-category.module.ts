import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MainCategoryModel, MainCategorySchema } from './main-category.schema';
import { MainCategoryResolver } from './main-category.resolver';
import { MainCategoryService } from './main-category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MainCategoryModel.name,
        schema: MainCategorySchema,
        collection: 'MainCategory',
      },
    ]),
  ],
  providers: [MainCategoryResolver, MainCategoryService],
  exports: [MainCategoryService],
})
export class MainCategoryModule {}
