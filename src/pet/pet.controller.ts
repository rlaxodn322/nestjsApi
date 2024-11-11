import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PetService } from './pet.service';
import { Comment } from './comment.entity';
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post('fetch')
  async fetchData(@Body() body: { numOfRows: number; selectedRegion: string }) {
    const { numOfRows, selectedRegion } = body;
    return await this.petService.getPetData(numOfRows, selectedRegion);
  }
}

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
