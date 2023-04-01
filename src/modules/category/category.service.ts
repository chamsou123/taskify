import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Category } from './entities';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.save(createCategoryInput);
  }

  async categories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async category(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException('Category Not Found');
    }

    return category;
  }

  async categoryByName(name: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ name });

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
    return this.category(id);
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.softDelete(id);
  }
}
