process.env.NODE_ENV = 'test';

const request = require('supertest');
const db = require('../db/connection');
const app = require('../app');
const testData = require('../db/data/test-data/index');
const { seed } = require('../db/seeds/seed');
const { check_game_event } = require('../utils/check_game_event');

describe('Auth Endpoints', () => {
  beforeEach(async () => {
    await seed(testData);
  });

  afterAll(async () => {
    db.end();
  });

  // test getcoinpricehistory route
  it('should return the price history for a coin', async () => {
    const res = await request(app).get('/api/history/1');
    expect(res.statusCode).toEqual(200);
    console.log('res.body', res.body);
    expect(res.body).toHaveProperty('priceHistory');
    expect(res.body.priceHistory[0]).toHaveProperty('coin_id');
    expect(res.body.priceHistory[0]).toHaveProperty('history_id');
    expect(res.body.priceHistory[0]).toHaveProperty('price');
    expect(res.body.priceHistory[0]).toHaveProperty('timestamp');
    const priceHistory = res.body.priceHistory;
    // change time in current event to be human readable
    priceHistory.forEach((price) => {
      price.time = new Date(price.timestamp).toLocaleString();

    });
    console.log('priceHistory', priceHistory);
  });

    // test getcoinpricehistory route
});
