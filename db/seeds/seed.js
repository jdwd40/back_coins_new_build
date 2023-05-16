const db = require('../connection');
const format = require('pg-format');
const {
  formatUserData,
  formatCoinsData,
  formatTransactionsData,
  formatCoinPriceHistoryData,
  formatEventsData,
  formatCoinEventsData,
  formatCoinData,
} = require('../../utils/formatData');

const seed = (data) => {
  const {
    users,
    coins,
    transactions,
    coinPriceHistory,
    events,
    coinEvents,
    userCoins,
  } = data;

  return db
    .query(`DROP TABLE IF EXISTS users CASCADE;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS coins CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS transactions CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS coin_price_history CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS events CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS coin_events CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS user_coins CASCADE;`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE users (
          user_id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          funds NUMERIC(20, 2) DEFAULT 15000.00
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE coins (
          coin_id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          symbol VARCHAR(10) UNIQUE NOT NULL,
          current_price NUMERIC(20, 8) NOT NULL
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE transactions (
          transaction_id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
          coin_id INTEGER NOT NULL REFERENCES coins(coin_id),
          type VARCHAR(4) NOT NULL CHECK (type IN ('buy', 'sell')),
          amount NUMERIC(20, 8) NOT NULL,
          price NUMERIC(20, 8) NOT NULL,
          timestamp TIMESTAMP NOT NULL
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE coin_price_history (
          history_id SERIAL PRIMARY KEY,
          coin_id INTEGER NOT NULL REFERENCES coins(coin_id),
          price NUMERIC(20, 8) NOT NULL,
          timestamp TIMESTAMP NOT NULL
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE events (
          event_id SERIAL PRIMARY KEY,
          type VARCHAR(10) NOT NULL CHECK (type IN ('boom', 'bust', 'stagnate')),
          start_time TIMESTAMP NOT NULL,
          end_time TIMESTAMP NOT NULL
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE coin_events (
          event_id SERIAL PRIMARY KEY,
          coin_id INTEGER NOT NULL REFERENCES coins(coin_id),
          type VARCHAR(10) NOT NULL CHECK (type IN ('good-spell', 'bad-spell', 'stagnate')),
          start_time TIMESTAMP NOT NULL,
          end_time TIMESTAMP NOT NULL
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE user_coins (
          user_coin_id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
          coin_id INTEGER NOT NULL REFERENCES coins(coin_id),
          amount NUMERIC(20, 8) NOT NULL
        );`);
    })
    .then(() => {
      const formattedUsers = formatUserData(users);
      const sql = format(
        `INSERT INTO users (username, email, password, funds) 
        VALUES %L RETURNING *;`,
        formattedUsers
      );
      return db.query(sql);
    })
    .then(() => {
      const formattedCoins = formatCoinsData(coins);
      const sql = format(
        `INSERT INTO coins (name, symbol, current_price) 
        VALUES %L RETURNING *;`,
        formattedCoins
      );
      return db.query(sql);
    })
    .then(() => {
      const formattedTransactions = formatTransactionsData(transactions);
      const sql = format(
        'INSERT INTO transactions (user_id, coin_id, type, amount, price, timestamp) VALUES %L RETURNING *;',
        formattedTransactions
      );
      return db.query(sql);
    })
    .then(() => {
      const formattedCoinPriceHistory =
        formatCoinPriceHistoryData(coinPriceHistory);
      const sql = format(
        'INSERT INTO coin_price_history (coin_id, price, timestamp) VALUES %L RETURNING *;',
        formattedCoinPriceHistory
      );
      return db.query(sql);
    })
    .then(() => {
      const formattedEvents = formatEventsData(events);
      const sql = format(
        'INSERT INTO events (type, start_time, end_time) VALUES %L RETURNING *;',
        formattedEvents
      );
      return db.query(sql);
    })
    .then(() => {
      const formattedCoinEvents = formatCoinEventsData(coinEvents);
      const sql = format(
        'INSERT INTO coin_events (coin_id, type, start_time, end_time) VALUES %L RETURNING *;',
        formattedCoinEvents
      );
      return db.query(sql);
    })
    .then(() => {
      const formattedUserCoins = formatCoinData(userCoins);
      const sql = format(
        'INSERT INTO user_coins (user_id, coin_id, amount) VALUES %L RETURNING *;',
        formattedUserCoins
      );
      return db.query(sql);
    });
};

module.exports = { seed };
