import { Test, TestingModule } from '@nestjs/testing';
import { HelthuploadService } from './helthupload.service';

describe('HelthuploadService', () => {
  let service: HelthuploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelthuploadService],
    }).compile();

    service = module.get<HelthuploadService>(HelthuploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
