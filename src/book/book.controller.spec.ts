import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import exp from 'constants';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              title: 'test',
              author: 'Author',
              publishedYear: 2020,
            }),
            create: jest.fn().mockResolvedValue({
              id: 1,
              title: 'test',
              author: 'Author',
              publishedYear: 2020,
            }),
            update: jest.fn().mockImplementation((id, updateBook) => ({
              id,
              ...updateBook,
            })),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([]);
  });
  it('', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({
      id: 1,
      title: 'test',
      author: 'Author',
      publishedYear: 2020,
    });
  });
  it('', async () => {
    const newBook = {
      id: 1,
      title: 'test',
      author: 'Author',
      publishedYear: 2020,
    };
    const result = await controller.create(newBook as any);
    expect(result).toEqual({
      id: 1,
      title: 'test',
      author: 'Author',
      publishedYear: 2020,
    });
  });
  it('', async () => {
    const updateBook = {
      title: 'Updated Book',
      author: 'Updated Author',
      publishedYear: 2022,
    };
    const result = await controller.update(1, updateBook as any);
    expect(result).toEqual({
      id: 1,
      title: 'Updated Book',
      author: 'Updated Author',
      publishedYear: 2022,
    });
  });
  it('', async () => {
    await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
