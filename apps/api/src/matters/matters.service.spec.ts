import { Test, TestingModule } from '@nestjs/testing';
import { MattersService } from './matters.service';

describe('MattersService', () => {
  let service: MattersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MattersService],
    }).compile();

    service = module.get<MattersService>(MattersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
