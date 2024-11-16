import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProviderParamsDto, ProviderQueryDto } from './dtos/query.dto';
import { ProviderService } from './provider.service';

@Controller('provider')
export class ProviderController {
  constructor(private readonly service: ProviderService) {}

  @Get()
  async listing() {
    return this.service.listing();
  }

  @Get('/:entity')
  async listingEntity(
    @Param() param: ProviderParamsDto,
    @Query() query: ProviderQueryDto,
  ) {
    return this.service.listingEntity(param, query);
  }
}
