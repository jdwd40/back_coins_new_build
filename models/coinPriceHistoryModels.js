const db = require('../db/connection');

exports.selectCoinPriceHistory = async () => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM coin_price_history ORDER BY timestamp DESC`
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.selectCoinPriceHistoryById = async (coinId) => {
  try {
    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000); // Calculate the timestamp for 6 hours ago
    const { rows } = await db.query(
      `SELECT * FROM coin_price_history WHERE coin_id = $1 AND timestamp >= $2 ORDER BY timestamp ASC`,
      [coinId, sixHoursAgo]
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.deleteCoinPriceHistory = async () => {
  // delete everything but the last 100 rows
  try {
    const { rows } = await db.query(
      `DELETE FROM coin_price_history WHERE coin_price_history_id NOT IN (SELECT coin_price_history_id FROM coin_price_history ORDER BY timestamp DESC LIMIT 100)`
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


