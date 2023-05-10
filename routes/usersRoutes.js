const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/userControllers');
const { withErrorHandling } = require('../errors');

// example usage in a route
router.post('/login', withErrorHandling(loginUser));

module.exports = router;
