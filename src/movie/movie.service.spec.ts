import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MovieInterface } from './movie.interface';

describe('MovieService', () => {
  let service: MovieService;
  let repository: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    repository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    it('', async () => {
      const result: MovieInterface[] = [
        {
          id: 1,
          title: 'Test Movie',
          director: 'Test Director',
          releaseYear: 2020,
          description: 'Test Description',
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(result);
      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('', async () => {
      const result: MovieInterface = {
        id: 1,
        title: 'Test Movie',
        director: 'Test Director',
        releaseYear: 2020,
        description: 'Test Description',
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(result);
      expect(await service.findOne(1)).toEqual(result);
    });
    describe('create', () => {
      it('', async () => {
        const movie: MovieInterface = {
          id: 1,
          title: 'Test Movie',
          director: 'Test Director',
          releaseYear: 2020,
          description: 'Test Description',
        };
        jest.spyOn(repository, 'create').mockReturnValue(movie as any);
        jest.spyOn(repository, 'save').mockResolvedValue(movie);

        expect(await service.create(movie)).toEqual(movie);
      });
    });
    describe('update',  () => {
      it('', async () => {
        const movie: MovieInterface = {
          id: 1,
          title: 'Test Movie',
          director: 'Test Director',
          releaseYear: 2020,
          description: 'Test Description',
        };
        jest.spyOn(repository, 'update').mockResolvedValue(undefined);
        jest
          .spyOn(repository, 'findOne')
          .mockResolvedValue({ id: 1, ...movie });
      });
      describe('remove',  () => {
        it('', async () => {
          jest.spyOn(repository, 'delete').mockResolvedValue({} as any);
          await service.remove(1);
          expect(repository.delete).toHaveBeenCalledWith(1);
        });
      });
    });
  });
});
