const { selectCoins, returnCoinPriceAverage } = require('../models/coinModels');
const { selectCurrentEvent } = require('../models/eventModels');
const db = require('../db/connection');
const { check_game_event } = require('./check_game_event');

const addCoinPriceHistory = async (coin_id, newPrice) => {
  try {
    await db.query(
      `INSERT INTO coin_price_history (coin_id, price, timestamp) VALUES ($1, $2, NOW())`,
      [coin_id, newPrice]
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.adjustCoinPrices = async () => {
  // Get all coins from the database
  await check_game_event();
  const event = await selectCurrentEvent();
  const coins = await selectCoins();

  // Determine price adjustment based on event type
  let minAdjustment;
  let maxAdjustment;

  // const averagePrice = coins.reduce((acc, coin) => acc + parseFloat(coin.current_price), 0) / coins.length;
  averagePrice = await returnCoinPriceAverage();
  console.log('av price',averagePrice);
  UPPER_THRESHOLD = 10.05;
  LOWER_THRESHOLD = 0.95;

  if (averagePrice > UPPER_THRESHOLD) {
    event.type = 'bear'; // Switch to bear market
  } else if (averagePrice < LOWER_THRESHOLD) {
    event.type = 'bull'; // Switch to bull market
  }

  if (event.type === 'boom') {
    minAdjustment = 1.01; // 1% increase
    maxAdjustment = 1.10; // 10% increase
  } else if (event.type === 'bust') {
    minAdjustment = 0.90; // 10% decrease
    maxAdjustment = 0.99; // 1% decrease
  } else if (event.type === 'bull') {
    minAdjustment = 1.01; // 1% increase
    maxAdjustment = 1.05; // 5% increase
  } else if (event.type === 'bear') {
    minAdjustment = 0.95; // 5% decrease
    maxAdjustment = 0.99; // 1% decrease
  } else if (event.type === 'stagnate') {
    minAdjustment = 0.98; // 2% decrease
    maxAdjustment = 1.02; // 2% increase
  }

  // Adjust the price of each coin
  for (let coin of coins) {

    if (coin.current_price < 0.000009) {
      const adjustment = Math.random() * (1.2 - 1.1) + 1.1;
      const newPrice = coin.current_price * adjustment;
      await db.query('UPDATE coins SET current_price = $1 WHERE coin_id = $2', [
        newPrice,
        coin.coin_id,
      ]);
      
      
    }
    // Generate a random adjustment within the specified range
    const adjustment =
      Math.random() * (maxAdjustment - minAdjustment) + minAdjustment;

    // Update the price of the coin
    const newPrice = coin.current_price * adjustment;
    await db.query('UPDATE coins SET current_price = $1 WHERE coin_id = $2', [
      newPrice,
      coin.coin_id,
    ]);
    // Add the new price to the coin's price history
    await addCoinPriceHistory(coin.coin_id, newPrice);
  }
};
