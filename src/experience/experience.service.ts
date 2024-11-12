import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './experience.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experinenceRepository: Repository<Experience>,
  ) {}
  async createExperience(
    title: string,
    description: string,
  ): Promise<Experience> {
    const experience = this.experinenceRepository.create({
      title,
      description,
    });
    return this.experinenceRepository.save(experience);
  }
  async getAllExperiences(): Promise<Experience[]> {
    return this.experinenceRepository.find();
  }
  async getExperienceById(id: number): Promise<Experience> {
    return this.experinenceRepository.findOne({ where: { id } });
  }
  async updateExperience(
    id: number,
    title: string,
    description: string,
  ): Promise<Experience> {
    await this.experinenceRepository.update(id, { title, description });
    return this.getExperienceById(id);
  }
  async deleteExperience(id: number): Promise<void> {
    await this.experinenceRepository.delete(id);
  }
}
