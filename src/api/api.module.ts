import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { HttpModule } from '@nestjs/axios';  // Import HttpModule
@Module({
  imports: [HttpModule],
  providers: [ApiService],
  controllers: [ApiController],
})
export class ApiModule {}
