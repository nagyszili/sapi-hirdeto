import { Resolver, Query, Args } from '@nestjs/graphql';
import { modelToObject } from 'src/util/mappers';
import { Category } from './category.type';
import { CategoryService } from './category.service';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => Category)
  async findCategoryById(@Args('id') id: string): Promise<Category> {
    return modelToObject(await this.categoryService.findCategoryById(id));
  }

  @Query(() => [Category])
  async findAllCategories(): Promise<Category[]> {
    return (await this.categoryService.findAllCategories()).map((category) =>
      modelToObject(category),
    );
  }

  @Query(() => [Category])
  async findCategoriesByMainCategoryId(
    @Args('id') id: string,
  ): Promise<Category[]> {
    return (
      await this.categoryService.findCategoriesByMainCategoryId(id)
    ).map((category) => modelToObject(category));
  }
}
