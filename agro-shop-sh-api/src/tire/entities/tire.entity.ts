import { Category } from '../../category/entities/category.entity';
import { Audit } from '../../data/entities/audit.entity';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tires')
export class Tire extends Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ type: 'nvarchar', length: 1500 })
  description: string;

  @Column({ type: 'nvarchar', length: 255 })
  imageUrl: string;

  @ManyToOne(() => Category, (category) => category.tires)
  category: Category;

  @ManyToOne(() => User, (user) => user.addedTires)
  addedBy: User;
}
