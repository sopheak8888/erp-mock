import { Injectable } from '@nestjs/common';
import { ProviderStrategy } from '../interfaces/provider-strategy.interface';
import { CustomerProviderStrategy } from '../strategies/customer-provider.strategy';

@Injectable()
export class ProviderStrategyFactory {
  private strategies = new Map<string, ProviderStrategy>();

  constructor(private readonly customerStrategy: CustomerProviderStrategy) {
    this.strategies.set('customer', customerStrategy);
  }

  getStrategy(entity: string): ProviderStrategy {
    const strategy = this.strategies.get(entity.toLowerCase());
    if (!strategy) {
      throw new Error(`Strategy not found for entity: ${entity}`);
    }
    return strategy;
  }
}
