import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('task get all tasks', () => {
    let app: INestApplication;

    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    afterEach(async () => {
      await app.close();
    });

    it('tasks should contain the right test task attributes', async () => {
      const response = await request(app.getHttpServer()).get('/tasks/a');

      const firstTask = response.body[0];
      expect(firstTask).toHaveProperty("taskId", "1");
      expect(firstTask).toHaveProperty("state", "todo");
      expect(firstTask).toHaveProperty("title", "premier titre");
      expect(firstTask).toHaveProperty("content", "premier contenu");
      expect(firstTask).toHaveProperty("boardId", "a");

      const secondTask = response.body[1];
      expect(secondTask).toHaveProperty("taskId", "2");
      expect(secondTask).toHaveProperty("state", "todo");
      expect(secondTask).toHaveProperty("title", "deuxième titre");
      expect(secondTask).toHaveProperty("content", "deuxième contenu");
      expect(secondTask).toHaveProperty("boardId", "a");
    });
  });