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

exports.selectCoinById = async (coin_id) => {
  try {
    const { rows } = await db.query(`SELECT * FROM coins WHERE coin_id = $1;`, [
      coin_id,
    ]);
    if (!rows.length) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.patchUserCoin = async (user_id, coin_id, amount) => {
  try {
    const { rows } = await db.query(
      `UPDATE user_coins SET amount = amount + $1 WHERE user_id = $2 AND coin_id = $3 RETURNING *;`,
      [amount, user_id, coin_id]
    );
    
    // No rows affected, return null
    if (!rows.length) {
      return null;
    }

    const updatedCoin = rows[0];
    // If the amount of the coin is now 0, delete the coin record from the user_coins table
    if (updatedCoin.amount == 0) {
      await db.query(
        `DELETE FROM user_coins WHERE user_id = $1 AND coin_id = $2;`,
        [user_id, coin_id]
      );
    }

    return updatedCoin;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


exports.addUserCoin = async (user_id, coin_id, amount) => {
  try {
    const { rows } = await db.query(
      `INSERT INTO user_coins (user_id, coin_id, amount) VALUES ($1, $2, $3) RETURNING *;`,
      [user_id, coin_id, amount]
    );
    if (!rows.length) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}