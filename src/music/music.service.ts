import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music, MusicInterface } from './music.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music) private musicRepository: Repository<Music>,
  ) {}
  async findAll(): Promise<MusicInterface[]> {
    return this.musicRepository.find();
  }
  async findOne(id: number): Promise<MusicInterface> {
    return this.musicRepository.findOne({ where: { id } });
  }
  async create(music: Omit<MusicInterface, 'id'>): Promise<MusicInterface> {
    const newMusic = this.musicRepository.create(music);
    return this.musicRepository.save(newMusic);
  }
  async update(
    id: number,
    music: Omit<MusicInterface, 'id'>,
  ): Promise<MusicInterface> {
    await this.musicRepository.update(id, music);
    return this.musicRepository.findOne({ where: { id } });
  }
  async remove(id: number): Promise<any> {
    await this.musicRepository.delete(id);
  }
}
