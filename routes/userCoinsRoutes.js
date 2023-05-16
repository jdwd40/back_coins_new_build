const express = require('express');
const router = express.Router();
const { withErrorHandling } = require('../errors');
const { getUsersCoins, buyCoin } = require('../controllers/userCoinsCotrollers');

// get user coins by id
router.get('/:user_id', withErrorHandling(getUsersCoins));

router.post('/buy', withErrorHandling(buyCoin));

module.exports = router;
