const express = require('express');
const router = express.Router();
const { withErrorHandling } = require('../errors');
const { getUsersCoins, buyCoin, sellCoin } = require('../controllers/userCoinsCotrollers');

// get user coins by id
router.get('/:user_id', withErrorHandling(getUsersCoins));

router.post('/buy', withErrorHandling(buyCoin));

router.post('/sell', withErrorHandling(sellCoin));

module.exports = router;
