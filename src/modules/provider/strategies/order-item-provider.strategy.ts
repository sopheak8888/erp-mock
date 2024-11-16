import { Injectable } from '@nestjs/common';
import { ProviderStrategy } from '../interfaces/provider-strategy.interface';
import { ProviderQueryDto } from '../dtos/query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/entities/order-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemProviderStrategy implements ProviderStrategy {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async execute(query: ProviderQueryDto): Promise<any> {
    const [orderItems, total] = await this.orderItemRepository.findAndCount({
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
      items: orderItems,
      total,
      page: query.page,
      limit: query.limit,
      pages: Math.ceil(total / query.limit),
    };
  }
}
