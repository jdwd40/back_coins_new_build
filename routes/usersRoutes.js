const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getAllUsers, deleteUser } = require('../controllers/userControllers');
const { withErrorHandling } = require('../errors');

// login route
router.post('/login', withErrorHandling(loginUser));
// register route
router.post('/register', withErrorHandling(registerUser));

router.get('/all', withErrorHandling(getAllUsers));

router.delete('/delete/:user_id', withErrorHandling(deleteUser));
module.exports = router;
