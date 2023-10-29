const db = require('../db/connection');
const {check_game_event} = require('./check_game_event');

jest.mock('../db/connection');

describe('checkGameEvent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should insert a new event into the database', async () => {
    const eventType = 'game';
    const startTime = new Date();
    const endTime = new Date();

    const mockReturnValue = {
      id: 1,
      type: eventType,
      start_time: startTime,
      end_time: endTime,
    };
    db.query.mockResolvedValueOnce({ rows: [mockReturnValue] });

    const result = await check_game_event(eventType, startTime, endTime);

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(
      'INSERT INTO events (type, start_time, end_time) VALUES ($1, $2, $3) RETURNING *',
      [eventType, startTime, endTime]
    );
    expect(result).toEqual(mockReturnValue);
  });

  it('should throw an error if the database query fails', async () => {
    const eventType = 'game';
    const startTime = new Date();
    const endTime = new Date();

    const mockError = new Error('Database query failed');
    db.query.mockRejectedValueOnce(mockError);

    await expect(check_game_event(eventType, startTime, endTime)).rejects.toThrow(
      mockError
    );
  });
});