import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { modelToObject } from 'src/util/mappers';
import { MainCategory } from './main-category.type';
import { MainCategoryService } from './main-category.service';
import { MainCategoryInput } from './main-category.input';

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

  @Mutation(() => MainCategory)
  async updateMainCategory(
    @Args('id') id: string,
    @Args() mainCategoryInput: MainCategoryInput,
  ): Promise<MainCategory> {
    const mainCategory = await this.mainCategoryService.updateMainCategory(
      id,
      mainCategoryInput,
    );
    return modelToObject(mainCategory);
  }
}
