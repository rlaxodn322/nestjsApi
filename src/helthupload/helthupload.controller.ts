import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HelthuploadService } from './helthupload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('uploads')
export class HelthuploadController {
  constructor(private readonly helthUploadService: HelthuploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const upload = await this.helthUploadService.create(
      file.originalname,
      file.path,
    );
    return { message: 'File uploaded successfully', upload };
  }
  @Get() findAll() {
    return this.helthUploadService.findAll();
  }
  @Get(':id') findOne(@Param('id') id: number) {
    return this.helthUploadService.findOne(id);
  }
  @Delete(':id') remove(@Param('id') id: number) {
    return this.helthUploadService.remove(id);
  }
}
