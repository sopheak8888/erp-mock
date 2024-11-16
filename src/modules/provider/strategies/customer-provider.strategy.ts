import { Injectable } from '@nestjs/common';
import { ProviderStrategy } from '../interfaces/provider-strategy.interface';
import { ProviderQueryDto } from '../dtos/query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerProviderStrategy implements ProviderStrategy {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async execute(query: ProviderQueryDto): Promise<any> {
    const [customers, total] = await this.customerRepository.findAndCount({
      where: {
        name: query.search,
      },
      take: query.limit,
      skip: (query.page - 1) * query.limit,
      order: {
        [query.sortBy]: query.sortOrder,
      },
    });

    return {
      items: customers,
      total,
      page: query.page,
      limit: query.limit,
      pages: Math.ceil(total / query.limit),
    };
  }
}
