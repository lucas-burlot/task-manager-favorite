import { Test, TestingModule } from '@nestjs/testing';
import { UrgentService } from './urgent.service';

describe('UrgentService', () => {
  let service: UrgentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrgentService],
    }).compile();

    service = module.get<UrgentService>(UrgentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
