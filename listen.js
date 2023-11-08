const app = require('./app');

app.listen(9091, (err) => {
  if (err) throw err;
  console.log(`coins Listening on port 9091...`);
});