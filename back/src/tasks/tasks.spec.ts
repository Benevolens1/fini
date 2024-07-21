import { Test, TestingModule } from '@nestjs/testing';
import { Tasks } from './tasks';

describe('Tasks', () => {
  let provider: Tasks;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Tasks],
    }).compile();

    provider = module.get<Tasks>(Tasks);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
