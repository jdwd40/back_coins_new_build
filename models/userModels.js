const db = require('../db/connection');

exports.selectUserByEmail = async (email) => {
  try {
    const { rows } = await db.query(`SELECT * FROM users WHERE email = $1;`, [
      email,
    ]);
    if (!rows.length) {
      throw new Error('Invalid email or password.');
    }
    return rows[0];
  } catch (error) {
    console.error(error);
    // Here you can return a custom error object or throw the error so it can be caught in an outer scope
    throw error;
  }
};

exports.checkIfEmailExists = async (email) => {
  try {
    const { rows } = await db.query(`SELECT * FROM users WHERE email = $1;`, [
      email,
    ]);
    if (!rows.length) {
      return null; // No user with this email exists
    }
    return rows[0]; // Return the user that was found
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.createUser = async (email, hashedPassword, name) => {
  try {
    const { rows } = await db.query(
      `INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *;`,
      [email, hashedPassword, name]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.selectAllUsers = async () => {
  try {
    const { rows } = await db.query(`SELECT * FROM users;`);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.removeUser = async (user_id) => {
  try {
    const { rows } = await db.query(
      `DELETE FROM users WHERE user_id = $1 RETURNING *;`,
      [user_id]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};


exports.returnUserBalance = async (user_id) => {
  try {
    const { rows } = await db.query(
      `SELECT funds FROM users WHERE user_id = $1;`,
      [user_id]
    );
    return rows[0].funds;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.selectUserById = async (user_id) => {
  try {
    const { rows } = await db.query(`SELECT * FROM users WHERE user_id = $1;`, [
      user_id,
    ]);
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.patchUserCoin = async (userId, coinId, amount) => {
  try {
    // Check if the user already has this type of coin
    const { rows } = await db.query(
      `SELECT * FROM user_coins WHERE user_id = $1 AND coin_id = $2`,
      [userId, coinId]
    );
    
    if (rows.length > 0) {
      // User already has this type of coin, so we update the amount
      await db.query(
        `UPDATE user_coins SET amount = amount + $1 WHERE user_id = $2 AND coin_id = $3`,
        [amount, userId, coinId]
      );
    } else {
      // User doesn't have this type of coin, so we insert a new record
      await db.query(
        `INSERT INTO user_coins (user_id, coin_id, amount) VALUES ($1, $2, $3)`,
        [userId, coinId, amount]
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.selectUserCoins = async (userId) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM user_coins WHERE user_id = $1`,
      [userId]
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.patchUserBalance = async (userId, amount) => {
  //change amount to a number
  console.log('amount', amount);
  amount = Number(amount);
  try {
    await db.query(
      `UPDATE users SET funds = $1 WHERE user_id = $2`,
      [amount, userId]
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

