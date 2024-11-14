import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }
  @Get(':id')
  findOne(@Param() id: number): Promise<Book> {
    return this.bookService.findOne(id);
  }
  @Post()
  create(@Body() book: Book): Promise<Book> {
    return this.bookService.create(book);
  }
  @Patch(':id')
  update(@Param() id: number, book: Partial<Book>): Promise<Book> {
    return this.bookService.update(id, book);
  }
  @Delete(':id')
  remove(@Param() id: number): Promise<void> {
    return this.bookService.remove(id);
  }
}
