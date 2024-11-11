import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class ApiService {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly toiletApi: string;
  private readonly adstApi: string;
  toilet: any;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('API_KEY1', 'default_api_key');
    this.baseUrl = this.configService.get<string>(
      'BASE_URL',
      'default_base_url',
    );
    this.toiletApi = this.configService.get<string>(
      'ToiletApi',
      'default_toiletApi',
    );
    this.adstApi = this.configService.get<string>('ADSTApi', 'default_adstApi');
  }
  getData(
    pIndex: number = 2,
    pSize: number = 1000,
    type: string = 'json',
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.toiletApi}?KEY=${this.apiKey}&Type=${type}&pIndex=${pIndex}&pSize=${pSize}`;
    return this.httpService.get(url).pipe(map((response) => response.data));
  }

  getADST(
    pIndex: number = 1,
    pSize: number = 1000,
    type: string = 'json',
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.adstApi}?KEY=${this.apiKey}&Type=${type}&pIndex=${pIndex}&pSize=${pSize}`;
    return this.httpService.get(url).pipe(map((response) => response.data));
  }
}
