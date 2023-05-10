// __tests__/authRoutes.test.js
process.env.NODE_ENV = 'test';

const request = require('supertest');
const db = require('../db/connection');
const app = require('../app');
const testData = require('../db/data/test-data/index');
const { seed } = require('../db/seeds/seed');
const { clearTables } = require('../db/utils');

describe('Auth Endpoints', () => {
  beforeEach(async () => {
    await seed(testData);
  });

  afterEach(async () => {
    db.end();
  });

  it('should log in a user with valid credentials', async () => {
    const res = await request(app).post('/login').send({
      email: 'john_doe@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    console.log('res.body', res.body);
  });

  it('should not log in a user with invalid credentials', async () => {
    const res = await request(app).post('/login').send({
      email: 'john_doe@example.com',
      password: 'wrongpassword',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid password.');
  });

  it('should not log in a non-existent user', async () => {
    const res = await request(app).post('/login').send({
      email: 'nonexistent@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid email.');
  });
});
