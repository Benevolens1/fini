import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { json } from 'sequelize';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token;

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

  it('/auth/signin (POST) : sign in', () => {
    return request(app.getHttpServer())
    .post('/api/auth/signin')
    .send({username: 'admin', password: 'password'})
    .then(response => response.body)
    .then(jsonObject => {
      token = jsonObject.access_token
    });
  });

  it('/admin/totalNumberOfBoards (GET) : get the total number of boards', () => {
    return request(app.getHttpServer())
      .get('/api/admin/totalNumberOfBoards')
      .auth(token, {type: 'bearer'})
      .then(res => res.body)
      .then(body => {
        expect(body.number).toBeGreaterThan(0);
      })
  });

  it('/admin/users (GET) : get all the users', () => {
    return request(app.getHttpServer())
    .get('/api/admin/users')
    .auth(token, {type: 'bearer'})
    .then(res => res.body)
    .then(body => {
      expect(body[0].username).toBe('John');
      expect(body[1].username).toBe('admin');
    });
  });

  it('/admin/user (POST) : create a user', () => {
    return request(app.getHttpServer())
    .post('/api/admin/user')
    .send({username: "testusername", password: "anotherpassword"})
    .auth(token, {type: 'bearer'})
    .expect(201)
  });

  it('/admin/password (POST) : change password', () => {
    return request(app.getHttpServer())
    .post('/api/admin/password')
    .auth(token, {type: 'bearer'})
    .send({username: 'testusername', password: "yetanotherpassword"})
    .expect(201)
  });

});