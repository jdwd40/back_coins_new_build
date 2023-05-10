const express = require('express');
const app = express();
const usersRoutes = require('./usersRoutes');
const { routeNotFound, methodNotAllowed } = require('../errors');
const { handleSQLErrors, handleCustomErrors, handle500 } = require('../errors');

app.use(express.json());
app.use('/user', usersRoutes);

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