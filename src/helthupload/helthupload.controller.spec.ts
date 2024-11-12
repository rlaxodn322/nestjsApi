import { Test, TestingModule } from '@nestjs/testing';
import { HelthuploadController } from './helthupload.controller';

describe('HelthuploadController', () => {
  let controller: HelthuploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelthuploadController],
    }).compile();

    controller = module.get<HelthuploadController>(HelthuploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
