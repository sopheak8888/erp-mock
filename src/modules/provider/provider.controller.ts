import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProviderQueryDto } from './dtos/query.dto';
import { ProviderService } from './provider.service';

@Controller('provider')
export class ProviderController {
  constructor(private readonly service: ProviderService) {}

  @Get('/:entity')
  async listing(
    @Param('entity') entity: string,
    @Query() query: ProviderQueryDto,
  ) {
    return this.service.listing(entity, query);
  }
}
