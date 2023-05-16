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

  // test buy endpoint user can buy a coin and it will appear in their usercoins
  it('should allow a user to buy a coin', async () => {
    const res = await request(app)
      .post('/api/usercoins/buy')
      .send({ user_id: 3, coin_id: 3, amount: 29 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Purchase successful.');
    const userCoins = await request(app).get('/api/usercoins/3');
    console.log('userCoins', userCoins.body.userCoins);
    //expect(userCoins.body.userCoins[0].amount).toBe('1.00000000');
    // check user funds have been updated
    const user = await request(app).get('/api/user/balance/3');
    console.log('funds', user.body);    
    expect(user.body.funds).toBe('9999.00000000');
  });
});
