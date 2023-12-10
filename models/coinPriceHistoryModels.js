const db = require('../db/connection');

exports.selectCoinPriceHistory = async (timeAmount=30) => {
  try {
    // Assuming 'timeAmount' is in minutes. Adjust accordingly if it's in hours, days, etc.
    const query = `
      SELECT * FROM coin_price_history
      WHERE timestamp >= NOW() - INTERVAL '${timeAmount} minutes'
      ORDER BY timestamp DESC
    `;

    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.selectCoinPriceHistoryById = async (coinId) => {
  try {
    const query = `
      SELECT *,
        MAX(price) AS highest_price,
        MIN(price) AS lowest_price,
        AVG(price) AS average_price
      FROM coin_price_history
      WHERE coin_id = $1
      ORDER BY timestamp ASC
    `;
    const { rows } = await db.query(query, [coinId]);
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


