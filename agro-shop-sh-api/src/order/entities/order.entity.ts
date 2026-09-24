import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Audit } from '../../data/entities/audit.entity';
import { OrderItem } from '../entities/order-item.entity';

@Entity('orders')
export class Order extends Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 32, unique: true })
  orderNumber: string;

  @Column({ type: 'nvarchar', length: 255 })
  firstName: string;

  @Column({ type: 'nvarchar', length: 255 })
  lastName: string;

  @Column({ type: 'nvarchar', length: 255 })
  email: string;

  @Column({ type: 'nvarchar', length: 15 })
  phone: string;

  @Column({ type: 'nvarchar', length: 255 })
  address: string;

  @Column({ type: 'nvarchar', length: 255 })
  city: string;

  @Column({ type: 'nvarchar', length: 10 })
  zipCode: string;

  @Column({ type: 'nvarchar', length: 255 })
  county: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({
    type: 'nvarchar',
    length: 20,
    default: 'pending',
  })
  status: string;

  @Column({ type: 'nvarchar', length: 1500, nullable: true })
  notes: string;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];
}
