const db = require('../db/connection');

const resetCoinPriceHistory = async () => {
    try {
      const { rows } = await db.query(`DELETE FROM coin_price_history`);
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  resetCoinPriceHistory();
