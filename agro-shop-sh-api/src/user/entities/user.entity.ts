import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tire } from '../../tire/entities/tire.entity';
import { IsOptional } from 'class-validator';
import { Audit } from '../../data/entities/audit.entity';

@Entity('users')
export class User extends Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', length: 255 })
  firstName: string;

  @Column({ type: 'nvarchar', length: 255 })
  lastName: string;

  @Column({ type: 'nvarchar', length: 255 })
  @IsOptional()
  department?: string;

  @Column({ type: 'nvarchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'nvarchar', length: 15 })
  phone: string;

  @Column({ type: 'nvarchar', length: 15 })
  role: string;

  @OneToMany(() => Tire, (tire) => tire.addedBy)
  addedTires: Tire[];
}
