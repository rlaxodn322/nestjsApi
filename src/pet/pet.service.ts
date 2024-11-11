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
  // https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=DpkRLgsobzDfVv8rurcfdgy4ocHfHmW7i18NoXZwOmaD%2BkJqsLCZ8dVcPaSWL4jV%2BG%2F2jIJVQOiFUkXFfSeqjg%3D%3D&upr_cd=6110000&pageNo=1&numOfRows=10
  // async getPetData(): Promise<any> {
  //   const serviceKey = this.configService.get<string>('API_KEY');
  //   const url = `https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=${serviceKey}&upr_cd=6110000&pageNo=1&numOfRows=1000&_type=json`;
  //   try {
  //     const response = await lastValueFrom(this.httpService.get(url));
  //     return this.filterPetData(response.data);
  //   } catch (error) {
  //     throw new Error('Error fetching pet data');
  //   }
  // }

  async getPetData(numOfRows: number, selectedRegion: string): Promise<any> {
    const serviceKey = this.configService.get<string>('API_KEY');
    const url = `https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=${serviceKey}&upr_cd=${selectedRegion}&pageNo=1&numOfRows=${numOfRows}&_type=json`;

    try {
      const response = await lastValueFrom(this.httpService.get(url));
      return this.filterPetData(response.data);
    } catch (error) {
      console.error('Error fetching pet data:', error);
      throw new Error('유기견 데이터를 가져오는 중 오류가 발생했습니다.');
    }[
      
    ]
  }
  private filterPetData(data: any): any {
    if (!data?.response?.body?.items?.item) {
      throw new Error('유기견 데이터가 없습니다.');
    }
    return data.response.body.items.item.map((item: any) => ({
      desertionNo: item.desertionNo,
      popfile: item.popfile,
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
