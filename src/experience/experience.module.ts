import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Experience])],
  providers: [ExperienceService],
  controllers: [ExperienceController],
})
export class ExperienceModule {}
