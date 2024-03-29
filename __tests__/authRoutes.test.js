// __tests__/authRoutes.test.js
process.env.NODE_ENV = 'test';

const request = require('supertest');
const db = require('../db/connection');
const app = require('../app');
const testData = require('../db/data/test-data/index');
const { seed } = require('../db/seeds/seed');
const { updateUserBalance } = require('../models/userModels');

describe('Auth Endpoints', () => {
  beforeEach(async () => {
    await seed(testData);
  });

  afterAll(async () => {
    db.end();
  });

  // test the /users/getUserByEmail endpoint
  it('should log in a user with valid credentials', async () => {
    const res = await request(app).post('/api/user/login').send({
      email: 'john_doe@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    console.log('res.body', res.body);
  });


  it('should not log in a user with invalid credentials', async () => {
    const res = await request(app).post('/api/user/login').send({
      email: 'john_doe@example.com',
      password: 'wrongpassword',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid password.');
  });

  it('should not log in a non-existent user', async () => {
    const res = await request(app).post('/api/user/login').send({
      email: 'nonexistent@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid email.');
  });

  // test the /users/register endpoint
  it('should register a new user', async () => {
    const res = await request(app).post('/api/user/register').send({
      email: 'new_user@example.com',
      password: 'password123',
      username: 'New User',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toEqual('new_user@example.com');
  });

  it('should not register a user with an existing email', async () => {
    const res = await request(app).post('/api/user/register').send({
      email: 'john_doe@example.com',
      password: 'password123',
      username: 'Existing User',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Email already exists.');
  });

  // write test it should not register a user with an existing username
  it('should not register a user with an existing username', async () => {
    const res = await request(app).post('/api/user/register').send({
      email: 'j@jd.com',
      password: 'password123',
      username: 'john_doe',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Username already exists.');
  });

  it('should not register a user with missing details', async () => {
    const res = await request(app).post('/api/user/register').send({
      email: 'missing_data@example.com',
      // password is missing
      name: 'Missing Data',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Required details are missing.');
  });

  // test the get /api/user/all
  it('should return all users', async () => {
    const res = await request(app).get('/api/user/all');
    expect(res.statusCode).toEqual(200);
    console.log('res.body', res.body);
    expect(res.body).toHaveLength(3);
  });

  // test the /api/user/delete/:id endpoint
  it('should delete a user', async () => {
    const res = await request(app).delete('/api/user/delete/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User deleted successfully.');
  });

  // test /balance route
  it('should return the balance of a user', async () => {
    const res = await request(app).get('/api/user/balance/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({"funds":'10000.00'}); 
  });
  // test updateUserBalance function
  it('should update the balance of a user when input is a number', async () => {
    const res = await request(app)
      .patch('/api/user/balance/1')
      .send({ amount: -20.0 });
    expect(res.statusCode).toEqual(200);
    // check user balance has been updated
    const res2 = await request(app).get('/api/user/balance/1');
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.funds).toEqual('9980.00');
  });
  // should check the input is a number
  it('should not update the balance of a user if input is not a number that can be converted', async () => {
    const res = await request(app)
      .patch('/api/user/balance/1')
      .send({ amount: 'twenty' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid input.');
  });
  // should update user blance if input is a string that can be converted
  it('should update the balance of a user if input is a string that can be converted', async () => {
    const res = await request(app)
      .patch('/api/user/balance/1')
      .send({ amount: '20.0' });
    expect(res.statusCode).toEqual(200);
    // check user balance has been updated
    const res2 = await request(app).get('/api/user/balance/1');
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.funds).toEqual('10020.00');
  });
});


