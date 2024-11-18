import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

describe('MovieController', () => {
  let controller: MovieController;
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              title: 'Test Movie',
              director: 'Test Director',
              releaseYear: 2020,
              description: 'Test Description',
            }),
            create: jest.fn().mockResolvedValue({
              id: 1,
              title: 'Test Movie',
              director: 'Test Director',
              releaseYear: 2020,
              description: 'Test Description',
            }),
            update: jest.fn().mockResolvedValue({
              id: 1,
              title: 'Test Movie',
              director: 'Test Director',
              releaseYear: 2020,
              description: 'Test Description',
            }),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
