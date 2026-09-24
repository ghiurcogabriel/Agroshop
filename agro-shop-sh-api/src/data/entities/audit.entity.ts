import { IsOptional } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Audit {
  @CreateDateColumn()
  @IsOptional()
  createdAt: Date;

  @UpdateDateColumn()
  @IsOptional()
  updatedAt: Date;

  @BeforeInsert()
  updateAuditOnCreation() {
    this.createdAt = new Date();
    this.updateAuditOnUpdate();
  }

  @BeforeUpdate()
  updateAuditOnUpdate() {
    this.updatedAt = new Date();
  }
}
