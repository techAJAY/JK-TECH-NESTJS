import { Test, TestingModule } from '@nestjs/testing';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { Express } from 'express';

const mockDocumentService = {
  create: jest.fn().mockResolvedValue({ id: 1, title: 'Jk Test Document', filePath: '/uploads/test.pdf' }),
  findAll: jest.fn().mockResolvedValue([{ id: 1, title: 'Jk Test Document', filePath: '/uploads/test.pdf' }]),
  findOne: jest.fn().mockImplementation((id) =>
    id === 1 ? { id: 1, title: 'Jk Test Document', filePath: '/uploads/test.pdf' } : null
  ),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('DocumentController', () => {
  let controller: DocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [{ provide: DocumentService, useValue: mockDocumentService }],
    }).compile();

    controller = module.get<DocumentController>(DocumentController);
  });

  it('should upload a document', async () => {
    const mockFile = { filename: 'test.pdf' } as Express.Multer.File;
    const result = await controller.uploadFile(mockFile, 'Jk Test Document');
    expect(result).toEqual({
      message: 'File uploaded successfully',
      document: { id: 1, title: 'Jk Test Document', filePath: '/uploads/test.pdf' },
    });
  });

  it('should return all documents', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, title: 'Jk Test Document', filePath: '/uploads/test.pdf' }]);
  });

  it('should return a document by ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({ id: 1, title: 'Jk Test Document', filePath: '/uploads/test.pdf' });
  });

  it('should return null for a non-existing document', async () => {
    const result = await controller.findOne(99);
    expect(result).toBeNull();
  });

  it('should delete a document', async () => {
    const result = await controller.remove(1);
    expect(mockDocumentService.remove).toHaveBeenCalledWith(1);
    expect(result).toBeUndefined();
  });
});
