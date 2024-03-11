const { selectCoinPriceHistory, selectCoinPriceHistoryById } = require('../models/coinPriceHistoryModels'); // Adjust the path as needed

// Get all coin price history
exports.getAllCoinPriceHistory = async (req, res, next) => {
  try {
    // Capture the 'amount' query parameter
    const { amount } = req.query;

    // Validate 'amount' or set a default value
    const timeAmount = amount ? parseInt(amount) : 30; // Default to 30 if not provided

    // Call your database query function with the timeAmount
    const priceHistory = await selectCoinPriceHistory(timeAmount);

    // Return the response
    res.status(200).json({ priceHistory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get coin price history by coin id
exports.getCoinPriceHistoryById = async (req, res, next) => {
  const { coin_id } = req.params;
  const { amount } = req.query;

  const timeAmount = amount ? parseInt(amount) : 30;
  try {
    const priceHistory = await selectCoinPriceHistoryById(coin_id, timeAmount);
    res.status(200).json({ priceHistory });
  } catch (error) {
    console.log(error);
  }
};
