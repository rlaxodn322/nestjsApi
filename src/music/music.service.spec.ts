import { Test, TestingModule } from '@nestjs/testing';
import { MusicService } from './music.service';
import { Repository } from 'typeorm';
import { Music } from './music.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

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
 
});
