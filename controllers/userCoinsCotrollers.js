const { selectUserCoins } = require('../models/userCoinsModels');

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
    }
    