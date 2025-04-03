import { Test, TestingModule } from '@nestjs/testing';
import { DocumentService } from './document.service';
import { Document } from './document.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const mockDocumentRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockResolvedValue({
    id: 1,
    title: 'Jk Test Document',
    filePath: '/uploads/test.pdf',
  }),
  find: jest
    .fn()
    .mockResolvedValue([
      { id: 1, title: 'Jk Test Document', filePath: '/uploads/test.pdf' },
    ]),
  findOne: jest.fn().mockImplementation(({ where: { id } }) => {
    return id === 1
      ? { id: 1, title: 'Jk Test Document', filePath: '/uploads/test.pdf' }
      : null;
  }),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
};

describe('DocumentService', () => {
  let service: DocumentService;
  let repository: Repository<Document>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentService,
        {
          provide: getRepositoryToken(Document),
          useValue: mockDocumentRepository,
        },
      ],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
    repository = module.get<Repository<Document>>(getRepositoryToken(Document));
  });

  //NOTE - document create test case
  it('should create a document', async () => {
    const result = await service.create(
      'Jk Test Document',
      '/uploads/test.pdf',
    );
    expect(result).toEqual({
      id: expect.any(Number),
      title: 'Jk Test Document',
      filePath: '/uploads/test.pdf',
    });

    expect(repository.create).toHaveBeenCalledWith({
      title: 'Jk Test Document',
      filePath: '/uploads/test.pdf',
    });
    expect(repository.save).toHaveBeenCalled();
  });

  //NOTE - find all document test case
  it('should return all documents', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      { id: 1, title: 'Jk Test Document', filePath: '/uploads/test.pdf' },
    ]);
    expect(repository.find).toHaveBeenCalled();
  });

  //NOTE - find document by Id test case
  it('should return a document by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
      id: 1,
      title: 'Jk Test Document',
      filePath: '/uploads/test.pdf',
    });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  //NOTE - if data not found
  it('should return null for a non-existing document', async () => {
    const result = await service.findOne(99);
    expect(result).toBeNull();
  });

  //NOTE - document delete test case
  it('should delete a document', async () => {
    const result = await service.remove(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
