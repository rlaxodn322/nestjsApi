import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoService.findOne(id);
  }
  @Post()
  create(@Body() todo: Partial<Todo>): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() todo: Partial<Todo>): Promise<Todo> {
    return this.todoService.update(id, todo);
  }
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.todoService.remove(id);
  }
}
