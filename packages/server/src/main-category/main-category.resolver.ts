import { Resolver, Query, Args } from '@nestjs/graphql';
import { modelToObject, mapModelsToObject } from 'src/util/mappers';
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

  @Query(() => MainCategory)
  async findMainCategoryByIdentifier(
    @Args('identifier') identifier: string,
  ): Promise<MainCategory> {
    return modelToObject(
      await this.mainCategoryService.findMainCategoryByIdentifier(identifier),
    );
  }

  @Query(() => [MainCategory])
  async findAllMainCategories(): Promise<MainCategory[]> {
    return mapModelsToObject(
      await this.mainCategoryService.findAllMainCategories(),
    );
  }
}
