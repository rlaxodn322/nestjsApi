import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicInterface } from './music.entity';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get()
  findAll(): Promise<MusicInterface[]> {
    return this.musicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<MusicInterface> {
    return this.musicService.findOne(id);
  }
  @Post()
  create(@Body() music: Omit<MusicInterface, 'id'>): Promise<MusicInterface> {
    return this.musicService.create(music);
  }
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() music: Omit<MusicInterface, 'id'>,
  ): Promise<MusicInterface> {
    return this.musicService.update(id, music);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<any> {
    return this.musicService.remove(id);
  }
}
