import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getWeatherData(
    baseData: string,
    baseTime: string,
    nx: number,
    ny: number,
  ): Promise<AxiosResponse> {
    const serviceKey = this.configService.get<string>('API_KEY');
    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${serviceKey}&pageNo=1&numOfRows=1000&dataType=json&base_date=${baseData}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
    try {
      return await this.httpService.get(url).toPromise();
    } catch (error) {
      throw new Error('ERROR ');
    }
  }
}
