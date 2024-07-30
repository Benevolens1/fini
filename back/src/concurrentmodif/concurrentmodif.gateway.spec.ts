import { Test, TestingModule } from '@nestjs/testing';
import { ConcurrentmodifGateway } from './concurrentmodif.gateway';

describe('ConcurrentmodifGateway', () => {
  let gateway: ConcurrentmodifGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcurrentmodifGateway],
    }).compile();

    gateway = module.get<ConcurrentmodifGateway>(ConcurrentmodifGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
