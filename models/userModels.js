const db = require('../db/connection');

exports.selectUserByEmail = async (email) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM users WHERE email = $1;`,
      [email]
    );
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
    const { rows } = await db.query(
      `SELECT * FROM users WHERE email = $1;`,
      [email]
    );
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
}

exports.selectAllUsers = async () => {
  try {
    const { rows } = await db.query(`SELECT * FROM users;`);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

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
}

exports.updateUserBalance = async (user_id, amount) => {
  try {
    const { rows } = await db.query(
      `UPDATE users SET funds = funds + $1 WHERE user_id = $2 RETURNING *;`,
      [amount, user_id]
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