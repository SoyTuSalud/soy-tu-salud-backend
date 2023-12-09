import { Test, TestingModule } from '@nestjs/testing';
import { MotherService } from './mother.service';

describe('MotherService', () => {
  let service: MotherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotherService]
    }).compile();

    service = module.get<MotherService>(MotherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

