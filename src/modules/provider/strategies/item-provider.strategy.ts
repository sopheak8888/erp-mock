import { Injectable } from '@nestjs/common';
import { ProviderStrategy } from '../interfaces/provider-strategy.interface';
import { ProviderQueryDto } from '../dtos/query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemProviderStrategy implements ProviderStrategy {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async execute(query: ProviderQueryDto): Promise<any> {
    const [items, total] = await this.itemRepository.findAndCount({
      where: {
        name: query.search,
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
      items: items,
      total,
      page: query.page,
      limit: query.limit,
      pages: Math.ceil(total / query.limit),
    };
  }
}
