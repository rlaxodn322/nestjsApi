import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('current')
  async getWeather(
    @Query('base_date') baseDate: string,
    @Query('base_time') baseTime: string,
    @Query('nx') nx: number,
    @Query('ny') ny: number,
  ) {
    const data = await this.weatherService.getWeatherData(
      baseDate,
      baseTime,
      nx,
      ny,
    );
    return data.data;
  }
}
