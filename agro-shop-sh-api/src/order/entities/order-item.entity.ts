import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', length: 255 })
  tireId: string;

  @Column({ type: 'nvarchar', length: 25 })
  diameter: string;

  @Column({ type: 'nvarchar', length: 25 })
  width: string;

  @Column({ type: 'nvarchar', length: 25 })
  height: string;

  @Column({ type: 'nvarchar', length: 25 })
  brand: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order;
}
