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
