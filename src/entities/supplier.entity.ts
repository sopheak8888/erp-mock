import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Reorder } from './reorder.entity';

@Entity('Suppliers')
export class Supplier {
  @PrimaryGeneratedColumn()
  supplier_id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, nullable: true })
  contact_name: string;

  @Column({ length: 30, nullable: true })
  contact_phone: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Reorder, (reorder) => reorder.supplier)
  reorders: Reorder[];
}
