import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async create(title: string, filePath: string): Promise<Document> {
    const newDocument = this.documentRepository.create({ title, filePath });
    return this.documentRepository.save(newDocument);
  }

  async findAll(): Promise<Document[]> {
    return this.documentRepository.find();
  }

  async findOne(id: number): Promise<Document> {
    return this.documentRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.documentRepository.delete(id);
  }
}
