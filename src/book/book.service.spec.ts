import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('BookService', () => {
  let service: BookService;
  let repository: Repository<Book>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('', async () => {
    const books = [
      { id: 1, title: 'test', author: 'author', publishedYear: 2020 },
    ];
    jest.spyOn(repository, 'find').mockResolvedValue(books as any);
    expect(await service.findAll()).toEqual(books);
  });
  it('', async () => {
    const book = {
      id: 1,
      title: 'test',
      author: 'author',
      publishedYear: 2020,
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue(book as any);
    expect(await service.findOne(2)).toEqual(book);
  });
  it('', async () => {
    const newBook = {
      title: 'new book',
      author: 'new author',
      publishedYear: 2021,
    };
    const saveBook = { id: 1, newBook };
    jest.spyOn(repository, 'save').mockResolvedValue(saveBook as any);
    expect(await service.create(newBook as any)).toEqual(saveBook);
  });
  it('', async () => {
    const updateBook = {
      title: 'update book',
      author: 'update author',
      publishedYear: '2021',
    };
    const saveBook = { id: 1, ...updateBook };
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findOne').mockResolvedValue(saveBook as any);
    expect(await service.update(1, updateBook)).toEqual(saveBook);
  });
});
