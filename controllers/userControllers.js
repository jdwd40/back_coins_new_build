require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { selectUserByEmail } = require('../models/userModels');
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
    console.error('login catch blog: ', error);
    if (error.message === 'Invalid email or password.')
      res.status(400).json({ message: 'Invalid email.' });
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the user.' });
  }
};
