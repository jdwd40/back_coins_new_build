const express = require('express');
const app = express();

const usersRoutes = require('./usersRoutes');
const coinRoutes = require('./coinRoutes');
const eventsRoutes = require('./eventsRoutes');
const coinPriceHistoryRoutes = require('./coinPriceHistoryRoutes');
const userCoinsRoutes = require('./userCoinsRoutes');

const { routeNotFound, methodNotAllowed } = require('../errors');
const { handleSQLErrors, handleCustomErrors, handle500 } = require('../errors');

app.use(express.json());

app.use('/', (req, res) => {
    res.status(200).send('Welcome to the Coins API');
});

app.use('/user', usersRoutes);

app.use('/coins', coinRoutes);

app.use('/currentevent', eventsRoutes);

app.use('/history', coinPriceHistoryRoutes);

app.use('/usercoins', userCoinsRoutes);

// catch 404 and forward to error handler
app.use(routeNotFound);

// SQL error handler
app.use(handleSQLErrors);

// Custom error handler
app.use(handleCustomErrors);

// Method not allowed handler
app.use(methodNotAllowed);

// Default error handler
app.use(handle500);

module.exports = app;
