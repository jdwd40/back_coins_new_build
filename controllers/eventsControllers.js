const { selectCurrentEvent } = require('../models/eventModels');

exports.getCurrentEvent = async (req, res) => {
  try {
    const currentEvent = await selectCurrentEvent();
    res.status(200).json({ currentEvent });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the events.' });
  }
};
