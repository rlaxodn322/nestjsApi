import { Module } from '@nestjs/common';
import { HelthuploadService } from './helthupload.service';
import { HelthuploadController } from './helthupload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelthUpload } from './helthupload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HelthUpload])],
  providers: [HelthuploadService],
  controllers: [HelthuploadController],
})
export class HelthuploadModule {}
