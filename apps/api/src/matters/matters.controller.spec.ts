import { Test, TestingModule } from '@nestjs/testing';
import { MattersController } from './matters.controller';

describe('MattersController', () => {
  let controller: MattersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MattersController],
    }).compile();

    controller = module.get<MattersController>(MattersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
