const db = require('../db/connection');

exports.selectCoins = async () => {
  try {
    const { rows } = await db.query(`SELECT * FROM coins;`);
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

exports.selectCoinEvents = async (coin_id) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM coin_events WHERE coin_id = $1;`,
      [coin_id]
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.selectCoinEventById = async (event_id) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM coin_events WHERE event_id = $1;`,
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

exports.updateCoinById = async (coin_id, price) => {
  try {
    const { rows } = await db.query(
      `UPDATE coins SET current_price = $1 WHERE coin_id = $2 RETURNING *;`,
      [price, coin_id]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
