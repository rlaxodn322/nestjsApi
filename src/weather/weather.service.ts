import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import * as moment from 'moment-timezone';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getWeatherData(): Promise<any> {
    const serviceKey = this.configService.get<string>('API_KEY');
    const now = moment().tz('Asia/Seoul');
    const baseDate = now.format('YYYYMMDD');
    let baseTime = now.format('HH00');
    // baseTime에서 1시간 빼기
    baseTime = moment(baseTime, 'HH00').subtract(1, 'hour').format('HH00');
    console.log(baseDate);
    console.log(baseTime);
    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${serviceKey}&pageNo=1&numOfRows=1000&dataType=json&base_date=${baseDate}&base_time=${baseTime}&nx=59&ny=126`;
    try {
      const response = await lastValueFrom(this.httpService.get(url));
      const categorizedData = this.categorizeData(
        response.data.response.body.items.item,
      );
      console.log(categorizedData);
      return categorizedData;
    } catch (error) {
      throw new Error('Error fetching weather data');
    }
  }

  categorizeData(items: any[]): any {
    return items.reduce((acc, item) => {
      acc[item.category] = {
        obsrValue: item.obsrValue,
        baseDate: item.baseDate,
        baseTime: item.baseTime,
        nx: item.nx,
        ny: item.ny,
      };
      return acc;
    }, {});
  }
}
