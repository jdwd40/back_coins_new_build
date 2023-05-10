const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/userControllers');
const { withErrorHandling } = require('../errors');

// login route
router.post('/login', withErrorHandling(loginUser));
// register route
router.post('/register', withErrorHandling(registerUser));

module.exports = router;
