const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { selectUserByEmail } = require('../models/userModels');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await selectUserByEmail(email);
  
      if (user) {
        // check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          res.status(400).json({ message: 'Invalid password.' });
        } else {
          // generate a token and send it back
          const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
            expiresIn: '24h',
          });
          res.status(200).json({ token });
        }
      } else {
        res.status(400).json({ message: 'Invalid email.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching the user.' });
    }
  };
  