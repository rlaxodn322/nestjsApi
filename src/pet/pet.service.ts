import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PetService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getPetData(): Promise<any> {
    const serviceKey = this.configService.get<string>('API_KEY');
    const url = `https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=${serviceKey}&pageNo=1&numOfRows=10&_type=json`;
    try {
      const response = await lastValueFrom(this.httpService.get(url));
      return this.filterPetData(response.data);
    } catch (error) {
      throw new Error('Error fetching pet data');
    }
  }
  private filterPetData(data: any): any {
    return data.response.body.items.item.map((item: any) => ({
      desertionNo: item.desertionNo,
      happenDt: item.happenDt,
      happenPlace: item.happenPlace,
      kindCd: item.kindCd,
      colorCd: item.colorCd,
      age: item.age,
      weight: item.weight,
      noticeNo: item.noticeNo,
      noticeSdt: item.noticeSdt,
      noticeEdt: item.noticeEdt,
      processState: item.processState,
      sexCd: item.sexCd,
      specialMark: item.specialMark,
      careNm: item.careNm,
      careTel: item.careTel,
      careAddr: item.careAddr,
      orgNm: item.orgNm,
      chargeNm: item.chargeNm,
    }));
  }
}
