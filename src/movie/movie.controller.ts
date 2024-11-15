import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieInterface } from './movie.interface';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll(): Promise<MovieInterface[]> {
    return this.movieService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<MovieInterface> {
    return this.movieService.findOne(id);
  }
  @Post()
  async create(@Body() movie: MovieInterface): Promise<MovieInterface> {
    return this.movieService.create(movie);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() movie: MovieInterface,
  ): Promise<MovieInterface> {
    return this.movieService.update(id, movie);
  }
  @Delete(':id')
  async remove(@Param() id: number): Promise<any> {
    return this.movieService.remove(id);
  }
}
