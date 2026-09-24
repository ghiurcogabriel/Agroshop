import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tire } from '../../tire/entities/tire.entity';
import { Audit } from '../../data/entities/audit.entity';

@Entity('categories')
export class Category extends Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', length: 50 })
  name: string;

  @OneToMany(() => Tire, (tire) => tire.category)
  tires: Tire[];
}
