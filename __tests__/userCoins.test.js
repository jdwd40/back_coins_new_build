process.env.NODE_ENV = 'test';

const request = require('supertest');
const db = require('../db/connection');
const app = require('../app');
const testData = require('../db/data/test-data/index');
const { seed } = require('../db/seeds/seed');
const { check_game_event } = require('../utils/check_game_event');

describe('user Coins Endpoints', () => {
  beforeEach(async () => {
    await seed(testData);
  });

  afterAll(async () => {
    db.end();
  });

  // test getusercoins route
  it('should return the coins a user owns', async () => {
    const res = await request(app).get('/api/usercoins/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('userCoins');
    expect(res.body.userCoins[0]).toHaveProperty('coin_id');
    expect(res.body.userCoins[0]).toHaveProperty('user_id');
    expect(res.body.userCoins[0]).toHaveProperty('amount');
    const userCoins = res.body.userCoins;
    console.log('userCoins', userCoins);
  });
});
