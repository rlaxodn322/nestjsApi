import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './review.entity';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewService.create(createReviewDto);
  }
  @Get()
  async findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    this.reviewService.remove(id);
  }
}
