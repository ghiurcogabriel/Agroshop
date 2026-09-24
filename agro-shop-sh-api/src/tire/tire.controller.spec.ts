import { Test, TestingModule } from '@nestjs/testing';
import { TireController } from './tire.controller';
import { TireService } from './tire.service';

describe('TireController', () => {
  let controller: TireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TireController],
      providers: [TireService],
    }).compile();

    controller = module.get<TireController>(TireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
