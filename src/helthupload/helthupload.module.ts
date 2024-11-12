import { Module } from '@nestjs/common';
import { HelthuploadService } from './helthupload.service';
import { UploadController } from './helthupload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelthUpload } from './helthupload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HelthUpload])],
  providers: [HelthuploadService],
  controllers: [UploadController],
})
export class HelthuploadModule {}
