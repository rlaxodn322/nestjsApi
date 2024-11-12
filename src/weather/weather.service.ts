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
  // 위도와 경도를 격자 좌표(nx, ny)로 변환하는 함수
  convertToGrid(lat: number, lng: number): { nx: number; ny: number } {
    const RE = 6371.00877; // 지구 반경(km)
    const GRID = 5.0; // 격자 간격(km)
    const SLAT1 = 30.0; // 투영 위도1(degree)
    const SLAT2 = 60.0; // 투영 위도2(degree)
    const OLON = 126.0; // 기준점 경도(degree)
    const OLAT = 38.0; // 기준점 위도(degree)
    const XO = 43; // 기준점 X좌표(GRID)
    const YO = 136; // 기준점 Y좌표(GRID)

    const DEGRAD = Math.PI / 180.0;
    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;

    let sn =
      Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
      Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);

    let ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);
    let theta = lng * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;

    const nx = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    const ny = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
    return { nx, ny };
  }
  async getWeatherData(lat: number, lng: number): Promise<any> {
    const serviceKey = this.configService.get<string>('API_KEY');
    const now = moment().tz('Asia/Seoul');
    const baseDate = now.format('YYYYMMDD');
    let baseTime = now.format('HH00');
    // baseTime에서 1시간 빼기
    baseTime = moment(baseTime, 'HH00').subtract(1, 'hour').format('HH00');

    const { nx, ny } = this.convertToGrid(lat, lng);
    console.log(baseDate);
    console.log(baseTime);
    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${serviceKey}&pageNo=1&numOfRows=1000&dataType=json&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
    console.log(url);
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
