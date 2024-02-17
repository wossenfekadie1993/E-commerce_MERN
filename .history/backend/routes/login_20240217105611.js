const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require("connect-mongo");
const passport = require("passport");

// Import Passport configuration
require('../passport-config');

// Set up express session middleware with MongoStore
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.DB_URL, collectionName: "sessions" }),
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Login route with Passport authentication
app.post('/', passport.authenticate('local', { successRedirect: '/protected', failureRedirect: '/' }));

module.exports = app;
