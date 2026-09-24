import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const createCategory = this.categoryRepository.create({
      name: createCategoryDto.name,
      tires: createCategoryDto.tires,
    });
    return await this.categoryRepository.save(createCategory);
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findBy({ id });
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    if (!id) {
      throw new NotFoundException(
        `Registered category with the ${id} was not found`,
      );
    }
    try {
      updateCategoryDto.id = id;
      return await this.categoryRepository.save(updateCategoryDto);
    } catch (e) {
      throw new Error(`Update error: ${e.message}.`);
    }
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findBy({ id });
    return await this.categoryRepository.remove(category);
  }
}
