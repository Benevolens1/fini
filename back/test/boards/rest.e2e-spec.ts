import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token;
  let boardId;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/signin (POST) sign in', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/signin')
      .send({username: "John", password: "thisisadefaultpassword"})
    expect(response.body).toHaveProperty('access_token');
    token = response.body.access_token;
  });

  it('/boards/newboard (POST) it creates a new board', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/boards/newboard')
      .send({title: 'my second'})
      .auth(token, {type: 'bearer'});
    expect(response.body).toHaveProperty('boardId')
    boardId = response.body.boardId;
  });

  it('/boards/boardId/' + boardId, () => {
    return request(app.getHttpServer())
      .get('/api/boards/boardId/' + boardId)
      .expect('Content-Type', /json/)
      .then((response) => {
        console.log('response.body :', response.body)
        expect(response.body).toHaveProperty('statusCode', 200);
        expect(response.body).toHaveProperty('message', 'ok');
      });
  });

  it('/boards/myboards (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/boards/myboards')
      .expect('Content-Type', /json/)
      .auth(token, {type: 'bearer'})
      .then((response) => {
        expect(response.body).toContain({boardId: 'a', title: 'my first board', creator: 'John'});
        expect(response.body).toContain({boardId: boardId, title: 'my second', creator: 'John'});

      })
  });
});
