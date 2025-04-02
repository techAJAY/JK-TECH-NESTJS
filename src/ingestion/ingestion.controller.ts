import { Controller, Post } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private ingestionService: IngestionService) {}

  @Post('trigger')
  triggerIngestion() {
    return this.ingestionService.triggerIngestion();
  }
}
