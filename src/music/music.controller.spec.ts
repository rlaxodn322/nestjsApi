import { Test, TestingModule } from '@nestjs/testing';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { MusicInterface } from './music.entity';
import { create } from 'domain';
import exp from 'constants';

describe('MusicController', () => {
  let controller: MusicController;
  let service: MusicService;
  const mockMusicService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  const mockMusic: MusicInterface = {
    id: 1,
    title: 'Song A',
    artist: 'Artist A',
    album: 'Album A',
    releaseYear: 2021,
    genre: 'Pop',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicController],
      providers: [
        {
          provide: MusicService,
          useValue: mockMusicService,
        },
      ],
    }).compile();

    controller = module.get<MusicController>(MusicController);
    service = module.get<MusicService>(MusicService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('', async () => {
    const result = [mockMusic];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.findAll()).toEqual(result);
    expect(service.findAll).toHaveBeenCalledWith();
  });
  it('', async () => {
    const id = 1;
    jest.spyOn(service, 'findOne').mockResolvedValue(mockMusic);
    expect(await controller.findOne(id)).toEqual(mockMusic);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });
  it('', async () => {
    const newMusic = {
      id: 1,
      title: 'Song A',
      artist: 'Artist A',
      album: 'Album A',
      releaseYear: 2021,
      genre: 'Pop',
    };
    const createdMusic = { id: 2, ...newMusic };
    jest.spyOn(service, 'create').mockResolvedValue(createdMusic);
    expect(await controller.create(newMusic)).toEqual(createdMusic);
    expect(service.create).toHaveBeenCalledWith(newMusic);
  });

  it('', async () => {
    const updatedMusic = {
      title: 'Song B',
      artist: 'Artist B',
      album: 'Album B',
      releaseYear: 2022,
      genre: 'Rock',
    };
    const id = 1;
    const result = { id, ...updatedMusic };
    jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await controller.update(id, updatedMusic)).toEqual(result);
    expect(service.update).toHaveBeenCalledWith(id, updatedMusic);
  });

  it('', async () => {
    const id = 1;
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove(id)).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
