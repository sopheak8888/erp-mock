import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { FakerService } from './faker.service';
import { SeedDataDto } from './dtos/seeder.dto';

@Controller('faker')
export class FakerController {
  constructor(private readonly fakerService: FakerService) {}

  @Post('seed')
  async seedDatabase(@Body() seedDataDto: SeedDataDto) {
    try {
      await this.fakerService.seed(seedDataDto.count);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Database seeded successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to seed database',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
