import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTireDto } from './dto/create-tire.dto';
import { UpdateTireDto } from './dto/update-tire.dto';
import { Tire } from './entities/tire.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TireService {
  constructor(
    @InjectRepository(Tire)
    private tireRepository: Repository<Tire>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createTireDto: CreateTireDto) {
    const category = await this.resolveCategory(createTireDto);
    const addedBy = await this.resolveUser(createTireDto);

    const addTire = this.tireRepository.create({
      brand: createTireDto.brand,
      width: createTireDto.width,
      height: createTireDto.height,
      diameter: createTireDto.diameter,
      price: createTireDto.price,
      description: createTireDto.description,
      imageUrl: createTireDto.imageUrl,
      category,
      addedBy,
    });
    return await this.tireRepository.save(addTire);
  }

  async findTiresByCategory(categoryName: string): Promise<Tire[]> {
    const category = await this.categoryRepository.findOne({
      where: { name: categoryName },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return this.tireRepository.find({
      where: { category: { id: category.id } },
    });
  }

  async findTiresByUser(userId: string): Promise<Tire[]> {
    if (!userId) {
      throw new NotFoundException('User not found');
    }
    return this.tireRepository.find({
      where: { addedBy: { id: userId } },
    });
  }

  async findTiresByCategoryAndUser(categoryName: string, userId: string) {
    const category = await this.categoryRepository.findOne({
      where: { name: categoryName },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return this.tireRepository.find({
      where: { category: { id: category.id }, addedBy: { id: userId } },
    });
  }

  async findTiresByBrand(brand: string) {
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return this.tireRepository.find({
      where: { brand },
    });
  }

  async findTiresByWidthHeightAndDiameter(
    width?: string,
    height?: string,
    diameter?: string,
  ) {
    const query: any = {};
    if (width) query.width = width;
    if (height) query.height = height;
    if (diameter) query.diameter = diameter;

    if (Object.keys(query).length === 0) {
      throw new NotFoundException(
        'At least one parameter (width, height, or diameter) must be provided',
      );
    }

    return this.tireRepository.find({
      where: query,
      relations: ['category', 'addedBy'],
    });
  }

  async findAll() {
    const tires = await this.tireRepository.find({
      relations: ['category', 'addedBy'],
      select: {
        category: { id: true, name: true },
        addedBy: { firstName: true, lastName: true },
      },
    });
    return tires;
  }

  async findHighlights() {
    const [recent, premium] = await Promise.all([
      this.tireRepository.find({
        order: { createdAt: 'DESC' },
        take: 8,
        relations: ['category', 'addedBy'],
        select: {
          category: { id: true, name: true },
          addedBy: { firstName: true, lastName: true },
        },
      }),
      this.tireRepository.find({
        order: { price: 'DESC' },
        take: 8,
        relations: ['category', 'addedBy'],
        select: {
          category: { id: true, name: true },
          addedBy: { firstName: true, lastName: true },
        },
      }),
    ]);

    return {
      recent,
      premium,
    };
  }

  async findOne(id: string) {
    const tire = await this.tireRepository.findOne({
      where: { id },
      relations: ['category', 'addedBy'],
      select: {
        category: { id: true, name: true },
        addedBy: { firstName: true, lastName: true },
      },
    });

    if (!tire) {
      throw new NotFoundException(`Tire with id ${id} was not found`);
    }

    return tire;
  }

  async update(id: string, updateTireDto: UpdateTireDto) {
    if (!id) {
      throw new NotFoundException(`Tire with the ${id} was not found`);
    }

    const existing = await this.tireRepository.findOne({
      where: { id },
      relations: ['category', 'addedBy'],
    });

    if (!existing) {
      throw new NotFoundException(`Tire with id ${id} was not found`);
    }

    const category = updateTireDto.categoryId
      ? await this.categoryRepository.findOne({
          where: { id: updateTireDto.categoryId },
        })
      : existing.category;

    const addedBy = updateTireDto.addedById
      ? await this.userRepository.findOne({
          where: { id: updateTireDto.addedById },
        })
      : existing.addedBy;

    const updated = this.tireRepository.merge(existing, {
      ...updateTireDto,
      id,
      category,
      addedBy,
    });

    return this.tireRepository.save(updated);
  }

  async remove(id: string) {
    const tire = await this.tireRepository.findOne({ where: { id } });

    if (!tire) {
      throw new NotFoundException(`Tire with id ${id} was not found`);
    }

    await this.tireRepository.remove(tire);
    return {
      success: true,
      id,
    };
  }

  private async resolveCategory(createTireDto: CreateTireDto): Promise<Category> {
    const rawCategory = createTireDto.category as
      | { id?: string; name?: string }
      | undefined;
    const categoryId = createTireDto.categoryId ?? rawCategory?.id;

    if (categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (category) {
        return category;
      }
    }

    if (rawCategory?.name) {
      const byName = await this.categoryRepository.findOne({
        where: { name: rawCategory.name },
      });

      if (byName) {
        return byName;
      }
    }

    const fallback = await this.categoryRepository.findOne({
      where: {},
      order: { createdAt: 'ASC' },
    });

    if (!fallback) {
      throw new NotFoundException(
        'Nu exista categorii disponibile. Creeaza mai intai o categorie.',
      );
    }

    return fallback;
  }

  private async resolveUser(createTireDto: CreateTireDto): Promise<User | null> {
    const rawUser = createTireDto.addedBy as { id?: string } | undefined;
    const userId = createTireDto.addedById ?? rawUser?.id;

    if (userId) {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (user) {
        return user;
      }
    }

    return this.userRepository.findOne({
      where: {},
      order: { createdAt: 'ASC' },
    });
  }
}
