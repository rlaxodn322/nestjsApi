import { Body, Controller, Get, Post } from '@nestjs/common';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}
  // @Get('current')
  // async getPet() {
  //   const data = await this.petService.getPetData();
  //   return data;
  // }
  // @Post('fetch')
  // async fetchPetData(
  //   @Body('numOfRows', 'selectedRegion') numOfRows: number,
  //   selectedRegion: string,
  // ) {
  //   return await this.petService.getPetData(numOfRows, selectedRegion);
  // }
  @Post('fetch')
  async fetchData(@Body() body: { numOfRows: number; selectedRegion: string }) {
    const { numOfRows, selectedRegion } = body;
    return await this.petService.getPetData(numOfRows, selectedRegion);
  }
}
