const {
  selectCoinById,
  getUserCoin,
  patchUserCoin,
  selectUserCoins,
  addUserCoin,
} = require('../models/userCoinsModels');
const { selectUserById, patchUserBalance } = require('../models/userModels');

exports.getUsersCoins = async (req, res) => {
  const { user_id } = req.params;
  try {
    const userCoins = await selectUserCoins(user_id);
    if (!userCoins) {
      return res.status(404).json({ message: 'User coins not found.' });
    }
    res.status(200).json({ userCoins });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the user coins.' });
  }
};

// This is a basic template. You should add error handling and validation.
exports.buyCoin = async (req, res) => {
  const { user_id, coin_id } = req.body;
  let { amount } = req.body;
  // covernt amount to float
  amount = parseFloat(amount);
  // Get user and coin info from database
  const user = await selectUserById(user_id);
  const buy_coin = await selectCoinById(coin_id);

  // convert user.funds to currencey
  user.funds = parseFloat(user.funds);
  buy_coin.current_price = parseFloat(buy_coin.current_price);

  if (user.funds < buy_coin.current_price * amount) {
    return res.status(400).json({ message: 'Insufficient funds.' });
  }

  const user_coins = await selectUserCoins(user_id);
  // look thro user_coins to see if user has buy_coin
  const user_coin = user_coins.find(
    (coin) => coin.coin_id === buy_coin.coin_id
  );

  // if user has buy_coin, update amount
  if (user_coin) {
    await patchUserCoin(user_id, coin_id, amount);
  } else {
    // if user does not have buy_coin, add coin to user_coins
    await addUserCoin(user_id, coin_id, amount);
  }

  // Update user balance
  await patchUserBalance(user_id, user.funds - buy_coin.current_price * amount);

  // Respond with 200 status request and message if successful
  res.status(200).json({ message: 'Purchase successful.' });
};

exports.sellCoin = async (req, res) => {
  const { user_id, coin_id } = req.body;
  let { amount } = req.body;
  
  // convert amount to float
  amount = parseFloat(amount);
  
  // Get user and coin info from database
  const user = await selectUserById(user_id);
  const sell_coin = await selectCoinById(coin_id);
  
  // convert user.funds to currencey
  user.funds = parseFloat(user.funds);
  sell_coin.current_price = parseFloat(sell_coin.current_price);

  // Get user's coins from database
  const user_coins = await selectUserCoins(user_id);
  const user_coin = user_coins.find(coin => coin.coin_id === sell_coin.coin_id);
  
  // Check if user has enough of the coin to sell
  if (!user_coin || user_coin.amount < amount) {
    return res.status(400).json({ message: 'Insufficient coins.' });
  }

  // Update the user's coin amount
  await patchUserCoin(user_id, coin_id, -amount);  // Note the negative sign here, it decreases the holdings

  // Update user balance
  await patchUserBalance(user_id, user.funds + sell_coin.current_price * amount);

  // Respond with 200 status request and message if successful
  res.status(200).json({ message: 'Sale successful.' });
};
