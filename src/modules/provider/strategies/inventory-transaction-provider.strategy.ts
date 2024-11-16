import { Injectable } from '@nestjs/common';
import { ProviderStrategy } from '../interfaces/provider-strategy.interface';
import { ProviderQueryDto } from '../dtos/query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryTransaction } from 'src/entities/inventory-transaction.entity';

@Injectable()
export class InventoryTransactionProviderStrategy implements ProviderStrategy {
  constructor(
    @InjectRepository(InventoryTransaction)
    private inventoryTransactionRepository: Repository<InventoryTransaction>,
  ) {}

  async execute(query: ProviderQueryDto): Promise<any> {
    const [inventoryTransactions, total] =
      await this.inventoryTransactionRepository.findAndCount({
        where: {
          source: query.search,
        },
        take: query.limit,
        skip: (query.page - 1) * query.limit,
        ...(query.sortBy
          ? {
              order: {
                [query.sortBy]: query.sortOrder,
              },
            }
          : {}),
      });

    return {
      items: inventoryTransactions,
      total,
      page: query.page,
      limit: query.limit,
      pages: Math.ceil(total / query.limit),
    };
  }
}
