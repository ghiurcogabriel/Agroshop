import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateEmployeeDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const createUser = this.userRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      phone: createUserDto.phone,
      department: createUserDto.department,
      role: createUserDto.role,
      addedTires: createUserDto.addedTires,
    });
    return await this.userRepository.save(createUser);
  }

  findAll() {
    const users = this.userRepository.find({ relations: ['addedTires'] });
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    return user;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    if (!id) {
      throw new NotFoundException(
        `Registered user with the ${id} was not found`,
      );
    }
    try {
      updateEmployeeDto.id = id;
      return await this.userRepository.save(updateEmployeeDto);
    } catch (e) {
      throw new Error(`Update error: ${e.message}.`);
    }
  }

  async remove(id: string) {
    if (!id) {
      throw new NotFoundException(
        `Registered user with the ${id} was not found`,
      );
    }
    try {
      const user = await this.userRepository.findBy({ id });
      return await this.userRepository.remove(user);
    } catch (e) {
      throw new Error(`Delete error: ${e.message}.`);
    }
  }
}
