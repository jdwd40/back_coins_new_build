const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getAllUsers, deleteUser, getUserBalance, getUserbyId, getUserByEmail } = require('../controllers/userControllers');
const { withErrorHandling } = require('../errors');

// login route
router.post('/login', withErrorHandling(loginUser));
// register route
router.post('/register', withErrorHandling(registerUser));

router.get('/all', withErrorHandling(getAllUsers));

router.get('/balance/:user_id', withErrorHandling(getUserBalance));

router.delete('/delete/:user_id', withErrorHandling(deleteUser));

router.get('/getuser/:user_id', withErrorHandling(getUserbyId));

router.get('/getemail/:email', withErrorHandling(getUserByEmail));

module.exports = router;
