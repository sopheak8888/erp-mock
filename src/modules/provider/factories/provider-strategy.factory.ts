import { Injectable } from '@nestjs/common';
import { ProviderStrategy } from '../interfaces/provider-strategy.interface';
import { CustomerProviderStrategy } from '../strategies/customer-provider.strategy';
import { SupplierProviderStrategy } from '../strategies/supplier-provider.strategy';
import { ItemProviderStrategy } from '../strategies/item-provider.strategy';
import { OrderProviderStrategy } from '../strategies/order-provider.strategy';
import { OrderItemProviderStrategy } from '../strategies/order-item-provider.strategy';
import { InventoryTransactionProviderStrategy } from '../strategies/inventory-transaction-provider.strategy';
import { ReorderProviderStrategy } from '../strategies/reorder-provider.strategy';
import C from '../common';

@Injectable()
export class ProviderStrategyFactory {
  private strategies = new Map<string, ProviderStrategy>();

  constructor(
    private readonly supplierStrategy: SupplierProviderStrategy,
    private readonly itemStrategy: ItemProviderStrategy,
    private readonly customerStrategy: CustomerProviderStrategy,
    private readonly orderStrategy: OrderProviderStrategy,
    private readonly orderItemStrategy: OrderItemProviderStrategy,
    private readonly inventoryTransactionStrategy: InventoryTransactionProviderStrategy,
    private readonly reorderStrategy: ReorderProviderStrategy,
  ) {
    this.strategies.set(C.SUPPLIER, supplierStrategy);
    this.strategies.set(C.ITEM, itemStrategy);
    this.strategies.set(C.CUSTOMER, customerStrategy);
    this.strategies.set(C.ORDER, orderStrategy);
    this.strategies.set(C.ORDER_ITEM, orderItemStrategy);
    this.strategies.set(C.INVENTORY_TRANSACTION, inventoryTransactionStrategy);
    this.strategies.set(C.REORDER, reorderStrategy);
  }

  getStrategy(entity: string): ProviderStrategy {
    const strategy = this.strategies.get(entity.toLowerCase());
    if (!strategy) {
      throw new Error(`Strategy not found for entity: ${entity}`);
    }
    return strategy;
  }
}
