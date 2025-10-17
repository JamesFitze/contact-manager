// app.js
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');           // <-- This was missing
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
const connectDB = require('./config/db');
const contactsRouter = require('./routes/contacts');

// connect once on startup
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// (optional) static / views if you kept them from the generator
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/contacts', contactsRouter);

// catch 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler (JSON response for API)
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
});

module.exports = app;
