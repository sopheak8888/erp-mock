import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { InventoryTransaction } from './inventory-transaction.entity';
import { OrderItem } from './order-item.entity';
import { Reorder } from './reorder.entity';

@Entity('Items')
export class Item {
  @PrimaryGeneratedColumn()
  item_id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 50, nullable: true })
  category: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  quantity_in_stock: number;

  @Column({ default: 10 })
  reorder_level: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => InventoryTransaction, (transaction) => transaction.item)
  transactions: InventoryTransaction[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.item)
  order_items: OrderItem[];

  @OneToMany(() => Reorder, (reorder) => reorder.item)
  reorders: Reorder[];
}
