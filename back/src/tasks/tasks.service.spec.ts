import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/sequelize';
import { Task } from './task.model';



describe('TasksService', () => {
  let service: TasksService;
  let task;

  let mockTaskModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task),
          useValue: mockTaskModel
        }
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);

    task = {
      taskId: "aaa",
      state: "todo",
      title: "this is a title",
      content: "what a beautiful content !",
      boardId: "idontknowman"
    };
  });

  it.todo('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create the user', () => {
    expect(service.createTask(task)).toBeTruthy();
  });

  it('should return the user', () => {
    expect(service.findAll()).toEqual([task]);
  });

  it('should delete the user', () => {
    expect(service.deleteTask('aaa')).toBeFalsy();
  });

  it('should return no user', () => {
    expect(service.findAll()).toEqual([]);
  });
});
