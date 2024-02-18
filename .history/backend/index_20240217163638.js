require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const flash = require('express-flash');
const { checkNotAuthenticated, checkAuthenticated, app: userApp } = require('./routes/users.js'); // Importing app from users.js
const productRoutes = require('./routes/products');

const port = process.env.PORT || 4000;
const db_url = process.env.DB_URL;

const app = express();
app.use(express.json());
app.use(cors());
app.set('view-engine', 'ejs');
app.use(flash());

mongoose.connect(db_url);
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection establish to database"));

// Home page
app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs');
});

// Login page
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
});

// Register page
app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs');
});

// Use user routes
app.use('/user', userApp);

// Use product routes
app.use('/product', productRoutes);

// Listening on given port
app.listen(port, (error) => {
  if (!error) {
    console.log("app is running on port", port);
  } else {
    console.log(error);
  }
});
