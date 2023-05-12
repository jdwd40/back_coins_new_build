const express = require('express');
const router = express.Router();
const { withErrorHandling } = require('../errors');
const { getAllCoins, getCoinById, updateCoin } = require('../controllers/coinControllers');

// Get all coins
router.get('/', withErrorHandling(getAllCoins));

// Get a specific coin by ID
router.get('/:coin_id', withErrorHandling(getCoinById));

// Update an existing coin
router.patch('/:coin_id', withErrorHandling(updateCoin));

module.exports = router;
