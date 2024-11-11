import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { Comment } from './comment.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Pet, Comment])],
  providers: [PetService],
  controllers: [PetController],
})
export class PetModule {}
