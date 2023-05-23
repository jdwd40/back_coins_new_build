const db = require('../db/connection');

exports.selectCurrentEvent = async () => {
  try {
    const currentEvent = await db.query(
      'SELECT * FROM events WHERE NOW() BETWEEN start_time AND end_time'
    );

    // Check if any rows were returned
    if (currentEvent.rows.length > 0) {
      // If there is a current event, return it
      return currentEvent.rows[0];
    } else {
      // If there are no current events, return null
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.selectEventById = async (event_id) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM events WHERE event_id = $1;`,
      [event_id]
    );
    if (!rows.length) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};


