import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category } from './entities';
import { CategoryService } from './category.service';
import { CreateCategoryDto, FilterCategoryDto, UpdateCategoryDto } from './dto';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category], { name: 'categories' })
  async categories(
    @Args('filterCategoryInput', { nullable: true })
    filterCategoryInput?: FilterCategoryDto,
  ): Promise<Category[]> {
    return this.categoryService.categories(filterCategoryInput);
  }

  @Query(() => Category, { name: 'category' })
  async category(
    @Args('id', { nullable: true })
    id: number,
  ): Promise<Category> {
    return this.categoryService.category(id);
  }

  @Mutation(() => Category, { name: 'createCategory' })
  async create(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryInput);
  }

  @Mutation(() => Category, { name: 'updateCategory' })
  async update(
    @Args('id') id: number,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(id, updateCategoryInput);
  }

  @Mutation(() => Boolean, { name: 'deleteCategory' })
  async delete(@Args('id') id: number): Promise<boolean> {
    await this.categoryService.delete(id);
    return true;
  }
}
