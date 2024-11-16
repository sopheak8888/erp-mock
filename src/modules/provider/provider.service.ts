import { Injectable } from '@nestjs/common';
import { ProviderQueryDto } from './dtos/query.dto';
import { ProviderStrategyFactory } from './factories/provider-strategy.factory';

@Injectable()
export class ProviderService {
  constructor(private readonly strategyFactory: ProviderStrategyFactory) {}

  async listing(entity: string, query: ProviderQueryDto) {
    const strategy = this.strategyFactory.getStrategy(entity);
    return strategy.execute(query);
  }
}
