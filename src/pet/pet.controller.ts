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
  @Post('fetch')
  async fetchPetData(@Body('numOfRows') numOfRows: number) {
    return await this.petService.getPetData(numOfRows);
  }
}
