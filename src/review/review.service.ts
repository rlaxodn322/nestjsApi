import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}
  //private reviews = [];
  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const newReview = this.reviewRepository.create(createReviewDto);
    return this.reviewRepository.save(newReview);
  }
  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.reviewRepository.delete(id);
  }
  //   create(createReviewDto: CreateReviewDto) {
  //     const newReview = { id: Date.now(), ...createReviewDto };
  //     this.reviews.push(newReview);
  //     return newReview;
  //   }
  //   findAll() {
  //     return this.reviews;
  //   }
}
