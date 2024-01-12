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
  // test api/currentevent
  it('should return the current event', async () => {
    const eventCheck = await check_game_event();
    //expect(eventCheck).toBe("Active event found");
    const res = await request(app).get('/api/currentevent');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('currentEvent');
    expect(res.body.currentEvent).toHaveProperty('event_id');
    expect(res.body.currentEvent).toHaveProperty('type');
    expect(res.body.currentEvent).toHaveProperty('start_time');
    expect(res.body.currentEvent).toHaveProperty('end_time');
    const currentEvent = res.body.currentEvent;
    // change time in current event to be human readable
    currentEvent.start_time = new Date(currentEvent.start_time).toLocaleString();
    currentEvent.end_time = new Date(currentEvent.end_time).toLocaleString();
    console.log('currentEvent', currentEvent);
  });

  
});
