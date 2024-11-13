import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { Experience } from './experience.entity';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  async create(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Promise<Experience> {
    return this.experienceService.createExperience(title, description);
  }
  
  @Get()
  async getAll(): Promise<Experience[]> {
    return this.experienceService.getAllExperiences();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Experience> {
    return this.experienceService.getExperienceById(id);
  }
  @Put(':id')
  async update(
    @Param('id') id: number,
    
    @Body('title') title: string,
    @Body('description') description: string,
  ): Promise<Experience> {
    return this.experienceService.updateExperience(id, title, description);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    this.experienceService.deleteExperience(id);
  }
}
