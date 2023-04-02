import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Category } from './entities';
import { CreateCategoryDto, FilterCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.save(createCategoryInput);
  }

  async categories(
    filterCategoryInput?: FilterCategoryDto,
  ): Promise<Category[]> {
    return this.categoryRepository.find({
      where: filterCategoryInput,
    });
  }

  async category(filterCategoryInput?: FilterCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
      ...filterCategoryInput,
    });

    if (!category) {
      throw new NotFoundException('Category Not Found');
    }

    return category;
  }

  async update(
    id: number,
    updateCategoryInput: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoryRepository.update(id, updateCategoryInput);
    return this.category({ id });
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.softDelete(id);
  }
}
