import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}
  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }
  findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOneBy({ id });
  }
  create(todo: Partial<Todo>): Promise<Todo> {
    const newTodo = this.todoRepository.create(todo);
    return this.todoRepository.save(newTodo);
  }
  async update(id: number, todo: Partial<Todo>): Promise<Todo> {
    await this.todoRepository.update(id, todo);
    return this.findOne(id);
  }
  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
