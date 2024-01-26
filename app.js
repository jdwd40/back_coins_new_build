// import controlers and set up route

const express = require('express');
const cors = require('cors');
const { handleCustomErrors, handlePSQLErrors, handleServerErrors } = require('./errors');
const apiRouter = require('./routes/api');
const { adjustCoinPrices } = require('./utils/simPrices');

const app = express();

const corsOptions = {
  origin: 'https://jwd1.online', // Your Netlify domain
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], // Add PATCH to the list of allowed methods
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); // This is where you add the CORS middleware
app.use(express.static('public'));
app.use(express.json());

app.use('/api', apiRouter);

setInterval(adjustCoinPrices, 30000);

// set up a intervel call to simPrices every 1 min

// app.use(handleCustomErrors);

// app.use(handlePSQLErrors);

// app.use(handleServerErrors);

module.exports = app;
