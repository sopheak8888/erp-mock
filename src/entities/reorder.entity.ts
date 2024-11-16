import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Supplier } from './supplier.entity';
import { Item } from './item.entity';

export enum ReorderStatus {
  PENDING = 'PENDING',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED',
}

@Entity('Reorders')
export class Reorder {
  @PrimaryGeneratedColumn()
  reorder_id: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.reorders)
  supplier: Supplier;

  @ManyToOne(() => Item, (item) => item.reorders)
  item: Item;

  @Column()
  quantity: number;

  @CreateDateColumn()
  reorder_date: Date;

  @Column({ type: 'enum', enum: ReorderStatus, default: ReorderStatus.PENDING })
  status: ReorderStatus;

  @Column({ type: 'text', nullable: true })
  remarks: string;
}
