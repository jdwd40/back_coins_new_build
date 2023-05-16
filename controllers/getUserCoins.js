const { selectUserCoins } = require('../models/userModels');

exports.getUserCoins = async (req, res) => {
  const { user_id } = req.params;
  try {
    const userCoins = await selectUserCoins(user_id);
    res.status(200).json({ userCoins });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the user coins.' });
  }
};
