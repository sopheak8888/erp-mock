import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Item } from './item.entity';

export enum TransactionType {
  IN = 'IN',
  OUT = 'OUT',
}

@Entity('Inventory_Transactions')
export class InventoryTransaction {
  @PrimaryGeneratedColumn()
  transaction_id: number;

  @ManyToOne(() => Item, (item) => item.transactions)
  item: Item;

  @Column({ type: 'enum', enum: TransactionType })
  transaction_type: TransactionType;

  @Column()
  quantity: number;

  @CreateDateColumn()
  transaction_date: Date;

  @Column({ length: 100, nullable: true })
  source: string;

  @Column({ type: 'text', nullable: true })
  remarks: string;
}
