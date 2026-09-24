import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Injectable()
export class CategorySeeder {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async seed() {
    const categories = [
      { name: 'All-Season' },
      { name: 'Winter' },
      { name: 'Summer' },
      { name: 'Performance' },
      { name: 'Off-Road' },
    ];

    for (const categoryData of categories) {
      const category = this.categoryRepository.create(categoryData);
      await this.categoryRepository.save(category);
    }
  }
}
