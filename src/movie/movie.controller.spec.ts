import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieInterface } from './movie.interface';
import exp from 'constants';
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
  describe('findAll', () => {
    it('', async () => {
      const result: MovieInterface[] = [];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await controller.findAll()).toEqual(result);
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
      jest.spyOn(service, 'findOne').mockResolvedValue(result);
      expect(await controller.findOne(1)).toEqual(result);
    });
  });
  describe('create', () => {
    it('', async () => {
      const result: MovieInterface = {
        id: 1,
        title: 'Test Movie',
        director: 'Test Director',
        releaseYear: 2020,
        description: 'Test Description',
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);
      expect(await controller.create(result)).toEqual(result);
    });
  });
  describe('update', () => {
    it('', async () => {
      const result: MovieInterface = {
        id: 1,
        title: 'Test Movie',
        director: 'Test Director',
        releaseYear: 2020,
        description: 'Test Description',
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);
      expect(await controller.update(1, result)).toEqual(result);
    });
  });
  describe('remove', () => {
    it('', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);
      expect(await controller.remove(1)).toBeUndefined();
    });
  });
});
