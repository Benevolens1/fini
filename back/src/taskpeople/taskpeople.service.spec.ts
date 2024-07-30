import { Test, TestingModule } from '@nestjs/testing';
import { TaskpeopleService } from './taskpeople.service';

describe('TaskpeopleService', () => {
  let service: TaskpeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskpeopleService],
    }).compile();

    service = module.get<TaskpeopleService>(TaskpeopleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
