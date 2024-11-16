import { Module } from '@nestjs/common';
import { FakerController } from './faker.controller';
import { FakerService } from './faker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/entities/supplier.entity';
import { Item } from 'src/entities/item.entity';
import { Customer } from 'src/entities/customer.entity';
import { Order } from 'src/entities/order.entity';
import { OrderItem } from 'src/entities/order-item.entity';
import { InventoryTransaction } from 'src/entities/inventory-transaction.entity';
import { Reorder } from 'src/entities/reorder.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Supplier,
      Item,
      Customer,
      Order,
      OrderItem,
      InventoryTransaction,
      Reorder,
    ]),
  ],
  controllers: [FakerController],
  providers: [FakerService],
})
export class FakerModule {}
