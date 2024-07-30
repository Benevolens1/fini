import { Test, TestingModule } from '@nestjs/testing';
import { SubtasksGateway } from './subtasks.gateway';

describe('SubtasksGateway', () => {
  let gateway: SubtasksGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubtasksGateway],
    }).compile();

    gateway = module.get<SubtasksGateway>(SubtasksGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
