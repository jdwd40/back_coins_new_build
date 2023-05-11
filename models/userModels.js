const db = require('../db/connection');
const bcrypt = require('bcrypt');

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

exports.createUser = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
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