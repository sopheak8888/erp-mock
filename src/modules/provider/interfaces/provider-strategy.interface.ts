import { ProviderQueryDto } from '../dtos/query.dto';

export interface ProviderStrategy {
  execute(query: ProviderQueryDto): Promise<any>;
}
