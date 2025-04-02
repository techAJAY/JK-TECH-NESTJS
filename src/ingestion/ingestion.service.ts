import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IngestionService {
  async triggerIngestion(): Promise<any> {
    const response = await axios.post('http://python-url/ingest', {
      data: 'data-to-ingest',
    });
    return response.data;
  }
}
