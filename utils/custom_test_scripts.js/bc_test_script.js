// a short script that tests to see if bcrypt is working properly

const bcrypt = require('bcrypt');
const password = 'testpassword';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
  console.log('Hashed password:', hash);
  bcrypt.compare(password, hash, function(err, result) {
    console.log('Comparison result:', result); // Should be true
  });
});
