import { Test, TestingModule } from '@nestjs/testing';
import { MusicService } from './music.service';
import { Repository } from 'typeorm';
import { Music } from './music.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import exp from 'constants';

describe('MusicService', () => {
  let service: MusicService;
  let repository: Repository<Music>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MusicService,
        {
          provide: getRepositoryToken(Music),
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

    service = module.get<MusicService>(MusicService);
    repository = module.get<Repository<Music>>(getRepositoryToken(Music));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('', async () => {
    const result = [
      {
        id: 1,
        title: 'Song A',
        artist: 'Artist A',
        album: 'Album A',
        releaseYear: 2021,
        genre: 'Pop',
      },
    ];
    jest.spyOn(repository, 'find').mockResolvedValue(result);
    expect(await service.findAll()).toEqual(result);
  });
  it('', async () => {
    const result = {
      id: 1,
      title: 'Song A',
      artist: 'Artist A',
      album: 'Album A',
      releaseYear: 2021,
      genre: 'Pop',
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue(result);
    expect(await service.findOne(1)).toEqual(result);
  });
  it('', async () => {
    const result = {
      title: 'Song A',
      artist: 'Artist A',
      album: 'Album A',
      releaseYear: 2021,
      genre: 'Pop',
    };
    const save = { id: 1, ...result };
    jest.spyOn(repository, 'create').mockReturnValue(result as any);
    jest.spyOn(repository, 'save').mockResolvedValue(save);
    expect(await service.create(result)).toEqual(save);
  });
  it('', async () => {
    const update = {
      title: 'Song A',
      artist: 'Artist A',
      album: 'Album A',
      releaseYear: 2021,
      genre: 'Pop',
    };
    const result = { id: 1, ...update };
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findOne').mockResolvedValue(result);
    expect(await service.update(1, update)).toEqual(result);
  });
  it('', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);
    await service.remove(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
