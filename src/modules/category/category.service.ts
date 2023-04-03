import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Category } from './entities';
import { CreateCategoryDto, FilterCategoryDto, UpdateCategoryDto } from './dto';
import { CATEGORY_NOT_FOUND } from '../../errors';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  /**
   * Creates a new category.
   * @param createCategoryInput {CreateCategoryDto} - The data to create a category.
   * @returns The created category.
   */
  async create(createCategoryInput: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.save(createCategoryInput);
  }

  /**
   * Retrieves a list of categories based on a filter.
   * @param filterCategoryInput {FilterCategoryDto} - The filter to apply to the query.
   * @returns A list of categories matching the filter.
   */
  async categories(
    filterCategoryInput?: FilterCategoryDto,
  ): Promise<Category[]> {
    return this.categoryRepository.find({
      where: filterCategoryInput,
    });
  }

  /**
   * Retrieves a category by its ID.
   * @param id {number} - The ID of the category to retrieve.
   * @returns The category matching the ID.
   * @throws NotFoundException if no category is found.
   */
  async category(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
      id,
    });

    if (!category) {
      throw new NotFoundException(CATEGORY_NOT_FOUND);
    }

    return category;
  }

  /**
   * Updates a category by its ID.
   * @param id {number} - The ID of the category to update.
   * @param updateCategoryInput {UpdateCategoryDto} - The data to update the category.
   * @returns The updated category.
   * @throws NotFoundException if no category is found.
   */
  async update(
    id: number,
    updateCategoryInput: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoryRepository.update(id, updateCategoryInput);
    return this.category(id);
  }

  /**
   * Deletes a category by its ID.
   * @param id {number} - The ID of the category to delete.
   * @throws NotFoundException if no category is found.
   */
  async delete(id: number): Promise<void> {
    const category = await this.category(id);
    await this.categoryRepository.softDelete(category.id);
  }
}
