import { Resolver, Query, Args } from '@nestjs/graphql';
import { modelToObject } from 'src/util/mappers';
import { MainCategory } from './main-category.type';
import { MainCategoryService } from './main-category.service';

@Resolver()
export class MainCategoryResolver {
  constructor(private mainCategoryService: MainCategoryService) {}

  @Query(() => MainCategory)
  async findMainCategoryById(@Args('id') id: string): Promise<MainCategory> {
    return modelToObject(
      await this.mainCategoryService.findMainCategoryById(id),
    );
  }

  @Query(() => [MainCategory])
  async findAllMainCategories(): Promise<MainCategory[]> {
    return (
      await this.mainCategoryService.findAllMainCategories()
    ).map((mainCategory) => modelToObject(mainCategory));
  }
}
