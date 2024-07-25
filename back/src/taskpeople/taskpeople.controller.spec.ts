import { Test, TestingModule } from '@nestjs/testing';
import { TaskpeopleController } from './taskpeople.controller';

describe('TaskpeopleController', () => {
  let controller: TaskpeopleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskpeopleController],
    }).compile();

    controller = module.get<TaskpeopleController>(TaskpeopleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
