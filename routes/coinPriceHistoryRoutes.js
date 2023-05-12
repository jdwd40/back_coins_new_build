const express = require('express');
const router = express.Router();
const { withErrorHandling } = require('../errors');
const { getAllCoinPriceHistory, getCoinPriceHistoryById} = require('../controllers/coinPriceHistoryControllers');

router.get('/', withErrorHandling(getAllCoinPriceHistory));

router.get('/:coin_id', withErrorHandling(getCoinPriceHistoryById));

module.exports = router;