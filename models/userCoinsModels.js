const db = require('../db/connection');

exports.selectUserCoins = async (user_id) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM user_coins WHERE user_id = $1;`,
      [user_id]
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
