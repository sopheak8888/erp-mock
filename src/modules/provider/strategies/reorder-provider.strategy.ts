import { Injectable } from '@nestjs/common';
import { ProviderStrategy } from '../interfaces/provider-strategy.interface';
import { ProviderQueryDto } from '../dtos/query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reorder } from 'src/entities/reorder.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReorderProviderStrategy implements ProviderStrategy {
  constructor(
    @InjectRepository(Reorder)
    private reorderRepository: Repository<Reorder>,
  ) {}

  async execute(query: ProviderQueryDto): Promise<any> {
    const [reorders, total] = await this.reorderRepository.findAndCount({
      take: query.limit,
      skip: (query.page - 1) * query.limit,
      order: {
        [query.sortBy]: query.sortOrder,
      },
    });

    return {
      items: reorders,
      total,
      page: query.page,
      limit: query.limit,
      pages: Math.ceil(total / query.limit),
    };
  }
}
