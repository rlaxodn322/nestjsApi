import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherDataDto } from './weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('current')
  async getWeather() {
    const data = await this.weatherService.getWeatherData();
    return this.formatWeatherData(data);
  }

  formatWeatherData(data: any): WeatherDataDto {
    return {
      temperature: this.formatWeatherItem(data.T1H),
      humidity: this.formatWeatherItem(data.REH),
      precipitation: this.formatWeatherItem(data.RN1),
      windSpeed: this.formatWeatherItem(data.WSD),
      windDirection: this.formatWeatherItem(data.VEC),
      visibility: this.formatWeatherItem(data.VVV),
      airPressure: this.formatWeatherItem(data.UUU),
      weatherCode: this.formatWeatherItem(data.PTY),
    };
  }

  formatWeatherItem(item: any): any {
    if (!item || !item.obsrValue) {
      // item이 없거나 obsrValue가 없으면 기본값을 반환하거나 오류 메시지 처리
      return {
        value: null,
        time: 'N/A',
        location: 'N/A',
      };
    }
    return {
      value: item.obsrValue,
      time: `${item.baseDate} ${item.baseTime}`,
      location: `(${item.nx}, ${item.ny})`,
    };
  }
}
