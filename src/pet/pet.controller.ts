import { Controller, Get } from '@nestjs/common';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}
  @Get('current')
  async getPet() {
    const data = await this.petService.getPetData();
    return data;
  }
}
