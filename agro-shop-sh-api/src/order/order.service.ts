import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new Order();
    order.orderNumber = await this.generateOrderNumber();
    order.firstName = this.cleanText(createOrderDto.firstName);
    order.lastName = this.cleanText(createOrderDto.lastName);
    order.email = this.cleanText(createOrderDto.email).toLowerCase();
    order.phone = this.cleanText(createOrderDto.phone);
    order.address = this.cleanText(createOrderDto.address);
    order.city = this.cleanText(createOrderDto.city);
    order.zipCode = this.cleanText(createOrderDto.zipCode);
    order.county = this.cleanText(createOrderDto.county);
    order.notes = createOrderDto.notes
      ? this.cleanText(createOrderDto.notes)
      : null;
    order.status = 'pending';

    // Calculate total from normalized numeric values, never trust client totals.
    const total = createOrderDto.items.reduce((sum, item) => {
      return sum + Number(item.price) * Number(item.quantity);
    }, 0);
    order.total = total;

    // Save order first
    const savedOrder = await this.orderRepository.save(order);

    // Create order items
    const orderItems = createOrderDto.items.map((item) => {
      const orderItem = new OrderItem();
      orderItem.tireId = item.tireId;
      orderItem.diameter = this.cleanText(item.diameter);
      orderItem.width = this.cleanText(item.width);
      orderItem.height = this.cleanText(item.height);
      orderItem.brand = this.cleanText(item.brand);
      orderItem.price = Number(item.price);
      orderItem.quantity = Number(item.quantity);
      orderItem.subtotal = Number(item.price) * Number(item.quantity);
      orderItem.order = savedOrder;
      return orderItem;
    });

    await this.orderItemRepository.save(orderItems);

    // Fetch complete order with items
    return this.orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ['items'],
    });
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['items'],
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException('Comanda nu a fost gasita.');
    }

    return order;
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    const order = await this.findOne(id);
    order.status = status;
    await this.orderRepository.save(order);
    return this.findOne(id);
  }

  private async generateOrderNumber(): Promise<string> {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const timestamp = Date.now().toString().slice(-8);
      const random = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0');
      const orderNumber = `ORD-${timestamp}-${random}`;

      const exists = await this.orderRepository.exist({
        where: { orderNumber },
      });

      if (!exists) {
        return orderNumber;
      }
    }

    // Final fallback with larger entropy if collisions are unexpectedly high.
    return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  }

  private cleanText(value: string): string {
    return value
      .replace(/[\u0000-\u001F\u007F]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
}
