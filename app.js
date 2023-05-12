// import controlers and set up route

const express = require('express');
const cors = require('cors');
const { handleCustomErrors, handlePSQLErrors, handleServerErrors } = require('./errors');
const apiRouter = require('./routes/api');
const { adjustCoinPrices } = require('./utils/simPrices');

const app = express();
app.use(express.static('public'));
app.use(express.json());

app.use('/api', apiRouter);

setInterval(adjustCoinPrices, 30000);

// set up a intervel call to simPrices every 1 min

// app.use(handleCustomErrors);

// app.use(handlePSQLErrors);

// app.use(handleServerErrors);

module.exports = app;