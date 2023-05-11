const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getAllUsers } = require('../controllers/userControllers');
const { withErrorHandling } = require('../errors');

// login route
router.post('/login', withErrorHandling(loginUser));
// register route
router.post('/register', withErrorHandling(registerUser));

router.get('/all', withErrorHandling(getAllUsers));

module.exports = router;
