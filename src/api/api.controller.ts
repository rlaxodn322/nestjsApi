import { Controller, Get, Query } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api1')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('data')
  getData(
    @Query('pIndex') pIndex: number = 2,
    @Query('pSize') pSize: number = 1000,
    @Query('type') type: string = 'json',
  ) {
    return this.apiService.getData(pIndex, pSize, type);
  }
  @Get('data1')
  
  getData1(
    @Query('pIndex') pIndex: number = 1,

    

    @Query('pSize') pSize: number = 1000,
    @Query('type') type: string = 'json',
  ) {
    return this.apiService.getData(pIndex, pSize, type);
  }
  @Get('ADSTdata')
  getADST(
    @Query('pIndex') pIndex: number = 1,
    @Query('pSize') pSize: number = 1000,
    @Query('type') type: string = 'json',

  ) {
    return this.apiService.getADST(pIndex, pSize, type);
  }
}

