import { Injectable } from '@nestjs/common';
import { ProviderStrategy } from '../interfaces/provider-strategy.interface';
import { ProviderQueryDto } from '../dtos/query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderProviderStrategy implements ProviderStrategy {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async execute(query: ProviderQueryDto): Promise<any> {
    const [orders, total] = await this.orderRepository.findAndCount({
      take: query.limit,
      skip: (query.page - 1) * query.limit,
      order: {
        [query.sortBy]: query.sortOrder,
      },
    });

    return {
      items: orders,
      total,
      page: query.page,
      limit: query.limit,
      pages: Math.ceil(total / query.limit),
    };
  }
}
