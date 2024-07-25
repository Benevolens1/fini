import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
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

  it('/boards/newboard/ (GET)', async () => {
    const response = await request(app.getHttpServer())
      .post('/boards/newboard')
      .send({username: "John", password: "thisisadefaultpassword"})
    expect(response.body).toBeDefined();
    expect(typeof response.body.boardId).toBe("string");
  });
});
