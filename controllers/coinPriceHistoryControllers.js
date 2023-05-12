const { selectCoinPriceHistory, selectCoinPriceHistoryById } = require('../models/coinPriceHistoryModels'); // Adjust the path as needed

// Get all coin price history
exports.getAllCoinPriceHistory = async (req, res, next) => {
  try {
    const priceHistory = await selectCoinPriceHistory();
    res.status(200).json({ priceHistory });
  } catch (error) {
    console.log(error);
  }
};

// Get coin price history by coin id
exports.getCoinPriceHistoryById = async (req, res, next) => {
  const { coin_id } = req.params;
  try {
    const priceHistory = await selectCoinPriceHistoryById(coin_id);
    res.status(200).json({ priceHistory });
  } catch (error) {
    console.log(error);
  }
};
