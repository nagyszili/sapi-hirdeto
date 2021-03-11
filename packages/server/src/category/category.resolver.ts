import { Resolver, Query, Args } from '@nestjs/graphql';
import { modelToObject, mapModelsToObject } from 'src/util/mappers';
import { Category } from './category.type';
import { CategoryService } from './category.service';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => Category)
  async findCategoryById(@Args('id') id: string): Promise<Category> {
    return modelToObject(await this.categoryService.findCategoryById(id));
  }

  @Query(() => Category)
  async findCategoryByIdentifier(
    @Args('identifier') identifier: string,
  ): Promise<Category> {
    return modelToObject(
      await this.categoryService.findCategoryByIdentifier(identifier),
    );
  }

  @Query(() => [Category])
  async findAllCategories(): Promise<Category[]> {
    return mapModelsToObject(await this.categoryService.findAllCategories());
  }

  @Query(() => [Category])
  async findCategoriesByMainCategoryId(
    @Args('id') id: string,
  ): Promise<Category[]> {
    return mapModelsToObject(
      await this.categoryService.findCategoriesByMainCategoryId(id),
    );
  }

  @Query(() => [Category])
  async findCategoriesByMainCategoryIdentifier(
    @Args('identifier') identifier: string,
  ): Promise<Category[]> {
    return mapModelsToObject(
      await this.categoryService.findCategoriesByMainCategoryIdentifier(
        identifier,
      ),
    );
  }
}
