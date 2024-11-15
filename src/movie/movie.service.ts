import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Repository } from 'typeorm';
import { MovieInterface } from './movie.interface';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<MovieInterface[]> {
    return await this.movieRepository.find();
  }
  async findOne(id: number): Promise<MovieInterface> {
    return await this.movieRepository.findOne({ where: { id } });
  }
  async create(movie: MovieInterface): Promise<MovieInterface> {
    const newMovie = this.movieRepository.create(movie);
    return await this.movieRepository.save(newMovie);
  }
  async update(id: number, movie: MovieInterface): Promise<MovieInterface> {
    await this.movieRepository.update(id, movie);
    return this.movieRepository.findOneBy({ id });
  }
  async remove(id: number): Promise<any> {
    return this.movieRepository.delete(id);
  }
}
