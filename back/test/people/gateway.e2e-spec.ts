import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { io, Socket } from 'socket.io-client';
import {FromServerCreatedTaskDto} from '../../src/tasks/fromServerCreatedTask.dto'

describe('EventsGateway', () => {
  let app: INestApplication;
  let socket: Socket;
  let task: FromServerCreatedTaskDto;

  let person;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.listen(3002);
  });

  beforeEach(done => {
    socket = io('http://localhost:3002/people');
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

  describe('create person', () => {
    it('should receive the createPerson sended', done => {
      socket.emit('boardId', "a");
      socket.emit('createPerson', {name: 'Yvick'});
      socket.on('createPerson', (receivedPerson) => {
        expect(receivedPerson).toHaveProperty('name', 'Yvick');
        expect(receivedPerson.personId).toBeDefined()
        expect(receivedPerson.boardId).toBeDefined()
        person = receivedPerson
        done();
      });
    });
  });

  describe('delete person', () => {
    it('should receive the deletePerson sended', done => {
      socket.emit('boardId', "a");
      socket.emit('deletePerson', person.personId);
      socket.on('deletePerson', (receivedPersonId) => {
        expect(receivedPersonId).toBe(person.personId)
        done();
      });
    });
  });
});
