fs = require('fs');
const {
  selectCoins,
  selectCoinById,
  selectCoinEvents,
  selectCoinEventById,
  updateCoinById,
  patchCoinBio,
} = require('../models/coinModels');

exports.getAllCoins = async (req, res) => {
  try {
    const coins = await selectCoins();
    res.status(200).json({ coins });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the coins.' });
  }
};

exports.getCoinById = async (req, res) => {
  const { coin_id } = req.params;
  try {
    const coin = await selectCoinById(coin_id);
    if (!coin) {
      return res.status(404).json({ message: 'Coin not found.' });
    }
    res.status(200).json( {coin} );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the coin.' });
  }
};

exports.getCoinEvents = async (req, res) => {
  const { coin_id } = req.params;
  try {
    const events = await selectCoinEvents(coin_id);
    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the events.' });
  }
};

exports.getCoinEventById = async (req, res) => {
  const { event_id } = req.params;
  try {
    const event = await selectCoinEventById(event_id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }
    res.status(200).json({ event });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the event.' });
  }
};

exports.updateCoin = async (req, res) => {
  const { coin_id } = req.params;
  const { current_price } = req.body;
  try {
    const coin = await selectCoinById(coin_id);
    if (!coin) {
      return res.status(404).json({ message: 'Coin not found.' });
    }
    const updatedCoin = await updateCoinById(coin_id, current_price);
    res.status(200).json({ coin: updatedCoin });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'An error occurred while updating the coin.' });
  }
};

exports.readAndInsertMarkdownFiles = async () => {
  try {
    // Read all markdown files in the current directory
    const markdownFiles = fs.readdirSync('../data/coininfo').filter((file) => file.endsWith('.md'));
    let comp_id = 1; 
    for (const file of markdownFiles) {
      const markdownData = fs.readFileSync(`../data/coininfo/${file}`, 'utf-8');

      // Insert the markdown data into the comps table as the bio field
     await patchCoinBio(comp_id, markdownData);
     comp_id++;
    }
  } catch (error) {
    console.error(error);
  }
};