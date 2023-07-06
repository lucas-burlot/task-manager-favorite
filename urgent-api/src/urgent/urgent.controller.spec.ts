import { Test, TestingModule } from '@nestjs/testing';
import { UrgentController } from './urgent.controller';

describe('UrgentController', () => {
  let controller: UrgentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrgentController],
    }).compile();

    controller = module.get<UrgentController>(UrgentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
