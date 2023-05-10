const db = require('../db/connection');

exports.selectUserByEmail = async (email) => {
    const { rows } = await db.query(
        `SELECT * FROM users WHERE email = $1;`,
        [email]
    );
    if (!rows.length) {
        return { message: 'Invalid email or password.' };
    }
    return rows[0];
}