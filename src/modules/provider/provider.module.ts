import { Module } from '@nestjs/common';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { ProviderStrategyFactory } from './factories/provider-strategy.factory';
import { CustomerProviderStrategy } from './strategies/customer-provider.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/entities/supplier.entity';
import { Item } from 'src/entities/item.entity';
import { Customer } from 'src/entities/customer.entity';
import { Order } from 'src/entities/order.entity';
import { OrderItem } from 'src/entities/order-item.entity';
import { InventoryTransaction } from 'src/entities/inventory-transaction.entity';
import { Reorder } from 'src/entities/reorder.entity';
import { ReorderProviderStrategy } from './strategies/reorder-provider.strategy';
import { InventoryTransactionProviderStrategy } from './strategies/inventory-transaction-provider.strategy';
import { OrderItemProviderStrategy } from './strategies/order-item-provider.strategy';
import { OrderProviderStrategy } from './strategies/order-provider.strategy';
import { ItemProviderStrategy } from './strategies/item-provider.strategy';
import { SupplierProviderStrategy } from './strategies/supplier-provider.strategy';

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
  controllers: [ProviderController],
  providers: [
    ProviderService,
    SupplierProviderStrategy,
    ItemProviderStrategy,
    CustomerProviderStrategy,
    OrderProviderStrategy,
    OrderItemProviderStrategy,
    InventoryTransactionProviderStrategy,
    ReorderProviderStrategy,
    ProviderStrategyFactory,
  ],
})
export class ProviderModule {}
