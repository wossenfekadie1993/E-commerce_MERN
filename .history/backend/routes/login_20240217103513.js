const express = require('express');
const app = express();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require("connect-mongo");
const passport = require("passport");

require('../passport-config');

// Use express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.DB_URL, collectionName: "sessions" }),
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.DB_URL, collectionName: "sessions" }),
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
