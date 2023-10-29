require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  selectUserByEmail,
  createUser,
  checkIfEmailExists,
  selectAllUsers,
  removeUser,
  returnUserBalance,
  selectUserById, 
  patchUserBalance
} = require('../models/userModels');
const secret = process.env.JWT_SECRET || 'default_secret';

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await selectUserByEmail(email);
    if (!user) {
      // No user with the given email exists
      return res.status(400).json({ message: 'Invalid email.' });
    }

    if (user) {
      // check if the password is correct
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(400).json({ message: 'Invalid password.' });
      } else {
        // generate a token and send it back
        const token = jwt.sign({ id: user.user_id }, secret, {
          expiresIn: '24h',
        });
        res.status(200).json({ token });
      }
    } else {
      res.status(400).json({ message: 'Invalid email.' });
    }
  } catch (error) {
    console.error('login catch block: ', error);
    if (error.message === 'Invalid email or password.')
      res.status(400).json({ message: 'Invalid email.' });
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the user.' });
  }
};

exports.registerUser = async (req, res) => {
  const { email, password, username } = req.body;
  // check if there are any missing details
  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Required details are missing.' });
  }
  try {
    const user = await checkIfEmailExists(email);
    if (user) {
      // A user with the given email already exists
      return res.status(400).json({ message: 'Email already exists.' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = await createUser(email, hashedPassword, username);
    // Generate a token
    const token = jwt.sign({ id: newUser.user_id }, secret, {
      expiresIn: '24h',
    });
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error('register catch block: ', error);
    if (
      error.message ===
      'duplicate key value violates unique constraint "users_username_key"'
    )
      res.status(400).json({ message: 'Username already exists.' });

    res.status(500).json({ message: 'An error occurred while registering.' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await selectAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('getAllUsers catch block: ', error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching users.' });
  }
};

exports.deleteUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const deletedUser = await removeUser(user_id);
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('deleteUser catch block: ', error);
    res
      .status(500)
      .json({ message: 'An error occurred while deleting the user.' });
  }
};

exports.getUserbyId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await selectUserById(user_id);
    res.status(200).json(user);
  } catch (error) {
    console.error('getUserById catch block: ', error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the user.' });
  }
};

exports.getUserBalance = async (req, res) => {
  const { user_id } = req.params;
  try {
    const balance = await returnUserBalance(user_id);
    res.status(200).json({"funds": balance});
  } catch (error) {
    console.error('getUserBalance catch block: ', error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the user balance.' });
  }
};

exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await selectUserByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    console.error('getUserByEmail catch block: ', error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the user.' });
  }
}

exports.updateUserBalance = async (req, res) => {
  const { user_id } = req.params;
  const { amount } = req.body;
  console.log('amount_from_updateUB: ', amount);
  // check to see if amount is a number
// check to see if amount is a number or can be converted to one
if (isNaN(Number(amount)) || amount === undefined || amount === null || amount === '') {
  return res.status(400).json({ message: 'Invalid input.' });
}


  try {
    await patchUserBalance(user_id, amount);
    res.status(200).json({"msg": "Balance updated successfully."});

  } catch (error) {
    console.error('updateUserBalance catch block: ', error);
    res
      .status(500)
      .json({ message: 'An error occurred while updating the user balance.' });
  }
}