import { Injectable } from '@nestjs/common';
import { ProviderStrategy } from '../interfaces/provider-strategy.interface';
import { ProviderQueryDto } from '../dtos/query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SupplierProviderStrategy implements ProviderStrategy {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async execute(query: ProviderQueryDto): Promise<any> {
    const [suppliers, total] = await this.supplierRepository.findAndCount({
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
      items: suppliers,
      total,
      page: query.page,
      limit: query.limit,
      pages: Math.ceil(total / query.limit),
    };
  }
}
