const db = require("../db/connection");

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
      const { rows } = await db.query(
        `SELECT * FROM coin_price_history WHERE coin_id = $1 ORDER BY timestamp DESC`,
        [coinId]
      );
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }