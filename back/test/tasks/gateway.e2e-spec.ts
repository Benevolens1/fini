import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { io, Socket } from 'socket.io-client';
import {FromServerCreatedTaskDto} from '../../src/tasks/fromServerCreatedTask.dto'

describe('EventsGateway', () => {
  let app: INestApplication;
  let socket: Socket;
  let task: FromServerCreatedTaskDto;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3001);
  });

  beforeEach(done => {
    socket = io('http://localhost:3001/tasks');
    socket.on('connect', () => {
      done();
    });
  });

  afterEach(() => {
    socket.disconnect();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('create task', () => {
    it('should receive the createTask sended', done => {
      socket.emit('boardId', "a");
      socket.emit('createTask', { taskId: 'taskid', state: 'todo', title: 'titre', content: 'contenulololol'});
      socket.on('createTask', (receivedTask) => {
        task = receivedTask;
        expect(task).toHaveProperty('state', 'todo');
        expect(task).toHaveProperty('title', 'titre');
        expect(task).toHaveProperty('content', 'contenulololol');
        expect(task).toHaveProperty('boardId', 'a');
        done();
      });
    });

    it('should receive an error for an inapropriate createTask sended', done => {
      socket.emit('boardId', "a");
      socket.emit('createTask', { taskIdError: 'taskid', state: 'todo', title: 'titre', content: 'contenulololol'});
      socket.on('createTask', (receivedTask) => {
        task = receivedTask;
        expect(task).toHaveProperty('state', 'todo');
        expect(task).toHaveProperty('title', 'titre');
        expect(task).toHaveProperty('content', 'contenulololol');
        expect(task).toHaveProperty('boardId', 'a');
        done();
      });
    });
  });

  describe('update task', () => {
    it('should receive the updateTask sended', done => {
      socket.emit('boardId', "a");
      socket.emit('updateTask', 
      {
          taskId: task.taskId,
          state: task.state, 
          title: task.title, 
          content: 'contenu modifié'
        }
      );
      socket.on('updateTask', (receivedTask) => {
        expect(receivedTask).toHaveProperty('state', 'todo');
        expect(receivedTask).toHaveProperty('title', 'titre');
        expect(receivedTask).toHaveProperty('content', 'contenu modifié');
        done();
      });
    });
  });


});
