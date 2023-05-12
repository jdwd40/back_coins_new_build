process.env.NODE_ENV = 'test';

const request = require('supertest');
const db = require('../db/connection');
const app = require('../app');
const testData = require('../db/data/test-data/index');
const { seed } = require('../db/seeds/seed');

describe('Auth Endpoints', () => {
  beforeEach(async () => {
    await seed(testData);
  });

  afterAll(async () => {
    db.end();
  });

  describe('GET /api/coins', () => {
    it('should respond with an array of coins', async () => {
      const res = await request(app)
        .get('/api/coins')
        .expect('Content-Type', /json/)
        .expect(200);

      // check that the response body is an array
      // expect(Array.isArray(res.body)).toBe(true);
      console.log(res.body);
      // optional: check that the first item in the array has properties of a coin
      if (res.body.length > 0) {
        const firstCoin = res.body[0];
        expect(firstCoin).toHaveProperty('coin_id');
        expect(firstCoin).toHaveProperty('name');
        expect(firstCoin).toHaveProperty('symbol');
        expect(firstCoin).toHaveProperty('current_price');
      }
    });

    // write tests for getcoinById
    describe('GET /api/coins/:coin_id', () => {
      it('should respond with a coin object', async () => {
        const res = await request(app)
          .get('/api/coins/1')
          .expect('Content-Type', /json/)
          .expect(200);

        // check that the response body is an object
        expect(typeof res.body.coin).toBe('object');
        // check that the response body has properties of a coin
        expect(res.body.coin).toHaveProperty('coin_id');
        expect(res.body.coin).toHaveProperty('name');
        expect(res.body.coin).toHaveProperty('symbol');
        expect(res.body.coin).toHaveProperty('current_price');
      });

      it('should respond with a 404 status code for a coin that does not exist', async () => {
        const res = await request(app)
          .get('/api/coins/1000')
          .expect('Content-Type', /json/)
          .expect(404);

        // check that the response body contains the error message
        expect(res.body).toHaveProperty('message');
      });

      // write tests for update coin. test to see if price of a coin can be changed
      describe('PATCH /api/coins/:coin_id', () => {
        it('should respond with the updated coin', async () => {
          const res = await request(app)
            .patch('/api/coins/1')
            .send({ current_price: 6969 })
            .expect('Content-Type', /json/)
            .expect(200);

          // check that the response body is an object
          expect(typeof res.body.coin).toBe('object');
          // check that the response body has properties of a coin
          expect(res.body.coin).toHaveProperty('coin_id');
          expect(res.body.coin).toHaveProperty('name');
          expect(res.body.coin).toHaveProperty('symbol');
          expect(res.body.coin).toHaveProperty('current_price');
          // check that the price has been updated
          expect(res.body.coin.current_price).toBe("6969.00000000");
        });

        it('should respond with a 404 status code for a coin that does not exist', async () => {
          const res = await request(app)
            .patch('/api/coins/1000')
            .send({ current_price: 100 })
            .expect('Content-Type', /json/)
            .expect(404);

          // check that the response body contains the error message
          expect(res.body).toHaveProperty('message');
        });
      });
    });
  });
});
