import { Injectable } from '@nestjs/common';
import { ProviderParamsDto, ProviderQueryDto } from './dtos/query.dto';
import { ProviderStrategyFactory } from './factories/provider-strategy.factory';
import C from './common';

@Injectable()
export class ProviderService {
  constructor(private readonly strategyFactory: ProviderStrategyFactory) {}

  async listing() {
    const allEntities = Object.values(C);
    return {
      items: allEntities,
      total: allEntities.length,
    };
  }

  async listingEntity(param: ProviderParamsDto, query: ProviderQueryDto) {
    const strategy = this.strategyFactory.getStrategy(param.entity);
    return strategy.execute(query);
  }
}
