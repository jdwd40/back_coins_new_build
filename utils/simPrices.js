const { selectCoins } = require('../models/coinModels');
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
  // console.log(event);

  // Determine price adjustment based on event type
  let minAdjustment;
  let maxAdjustment;

  if (event.type === 'boom') {
    minAdjustment = 1.0001; // .01% increase
    maxAdjustment = 1.0007; // .07% increase
  } else if (event.type === 'bust') {
    minAdjustment = 1 - 0.0001; // .01% decrease
    maxAdjustment = 1 - 0.0007; // .07% decrease
  } else if (event.type === 'stagnate') {
    minAdjustment = 0.99999; // .001% decrease
    maxAdjustment = 1.00001; // .001% increase
  }

  // Adjust the price of each coin
  for (let coin of coins) {
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
