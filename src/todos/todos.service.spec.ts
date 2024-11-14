import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { DeleteResult, Repository } from 'typeorm';
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
    const createTodoDto = { title: 'test', description: 'test d' };
    const todo = { id: 1, ...createTodoDto };

    jest.spyOn(repository, 'create').mockReturnValue(todo as any);
    jest.spyOn(repository, 'save').mockResolvedValue(todo as any);

    const result = await service.create(createTodoDto);
    expect(result).toEqual(todo);
    expect(repository.create).toHaveBeenCalledWith(createTodoDto);
    expect(repository.save).toHaveBeenCalledWith(todo);
  });

  it('should find all todos', async () => {
    const todos = [{ title: 'test todo', completed: false }] as Todo[];
    jest.spyOn(repository, 'find').mockResolvedValue(todos);
    expect(await service.findAll()).toEqual(todos);
  });

  it('should', async () => {
    const updateTodoDto = { title: 'update', description: 'update' };
    const existing = { id: 1, title: 'old', description: 'old' };
    const updateTodo = { id: 1, updateTodoDto };
    const updateResult = {
      raw: [],
      generatedMaps: [],
      affected: 1,
    };
    jest.spyOn(repository, 'update').mockResolvedValue(updateResult);
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(updateTodo as any);
    const result = await service.update(1, updateTodoDto);

    expect(result).toEqual(updateTodo);
    expect(repository.update).toHaveBeenCalledWith(1, updateTodoDto);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });
  it('should', async () => {
    const todoId = 1;
    const deleteResult: DeleteResult = {
      raw: [],
      affected: 1,
    };
    jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);
    await service.remove(todoId);
    expect(repository.delete).toHaveBeenCalledWith(todoId);
  });
});
