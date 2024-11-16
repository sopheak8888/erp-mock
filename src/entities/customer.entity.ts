import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('Customers')
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 30, nullable: true })
  contact_phone: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
