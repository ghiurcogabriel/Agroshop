import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TireService } from './tire.service';
import { CreateTireDto } from './dto/create-tire.dto';
import { UpdateTireDto } from './dto/update-tire.dto';
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';

@Controller('tires')
export class TireController {
  constructor(private readonly tireService: TireService) {}

  @Post('add-tires')
  @UseGuards(AdminAuthGuard)
  async create(@Body() createTireDto: CreateTireDto) {
    return await this.tireService.create(createTireDto);
  }

  @Get('category/:category')
  async findTiresByCategory(@Param('category') category: string) {
    return await this.tireService.findTiresByCategory(category);
  }

  @Get('user/:userId')
  async findTiresByUser(@Param('userId') userId: string) {
    return await this.tireService.findTiresByUser(userId);
  }

  @Get('category/:category/user/:userId')
  async findTiresByCategoryAndUser(
    @Param('category') category: string,
    @Param('userId') userId: string,
  ) {
    return await this.tireService.findTiresByCategoryAndUser(category, userId);
  }

  @Get('search')
  async findTiresByWidthHeightDiameter(
    @Query('width') width?: string,
    @Query('height') height?: string,
    @Query('diameter') diameter?: string,
  ) {
    return await this.tireService.findTiresByWidthHeightAndDiameter(
      width,
      height,
      diameter,
    );
  }

  @Get()
  async findAll() {
    return await this.tireService.findAll();
  }

  @Get('highlights')
  async findHighlights() {
    return await this.tireService.findHighlights();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tireService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminAuthGuard)
  async update(@Param('id') id: string, @Body() updateTireDto: UpdateTireDto) {
    return await this.tireService.update(id, updateTireDto);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  async remove(@Param('id') id: string) {
    return await this.tireService.remove(id);
  }
}
