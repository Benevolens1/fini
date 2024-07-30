import { Test, TestingModule } from '@nestjs/testing';
import { TaskpeopleGateway } from './taskpeople.gateway';

describe('TaskpeopleGateway', () => {
  let gateway: TaskpeopleGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskpeopleGateway],
    }).compile();

    gateway = module.get<TaskpeopleGateway>(TaskpeopleGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
