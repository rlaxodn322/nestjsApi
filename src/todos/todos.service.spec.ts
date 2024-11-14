import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TodosService', () => {
  let service: TodosService;
  let repository: Repository<Todo>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    repository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo', async () => {
    const todo = { title: 'test todo', completed: false };
    jest.spyOn(repository, 'save').mockResolvedValue(todo as Todo);
    expect(await service.create(todo)).toEqual(todo);
  });

  it('should find all todos', async () => {
    const todos = [{ title: 'test todo', completed: false }] as Todo[];
    jest.spyOn(repository, 'find').mockResolvedValue(todos);
    expect(await service.findAll()).toEqual(todos);
  });
});
