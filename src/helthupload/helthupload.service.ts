import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelthUpload } from './helthupload.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HelthuploadService {
  constructor(
    @InjectRepository(HelthUpload)
    private helthUploadRepository: Repository<HelthUpload>,
  ) {}
  create(filename: string, filepath: string): Promise<HelthUpload> {
    const newUpload = this.helthUploadRepository.create({ filename, filepath });
    return this.helthUploadRepository.save(newUpload);
  }
  findAll(): Promise<HelthUpload[]> {
    return this.helthUploadRepository.find();
  }
  findOne(id: number): Promise<HelthUpload> {
    return this.helthUploadRepository.findOne({ where: { id } });
  }
  remove(id: number): Promise<HelthUpload> {
    return this.helthUploadRepository.delete(id).then(() => undefined);
  }
}
