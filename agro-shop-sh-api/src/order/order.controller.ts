import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Get('admin')
  @UseGuards(AdminAuthGuard)
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get('admin/:id')
  @UseGuards(AdminAuthGuard)
  async findOneAdmin(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Patch('admin/:id/status')
  @UseGuards(AdminAuthGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto,
  ): Promise<Order> {
    return this.orderService.updateStatus(id, dto.status);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }
}
