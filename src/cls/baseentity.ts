import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ nullable: true, type: 'datetime' })
  createdAt: Date;
  @UpdateDateColumn({ nullable: true, type: 'datetime' })
  updatedAt: Date;
}
