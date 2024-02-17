require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/users");
const port = process.env.PORT || 4000;
const db_url = process.env.DB_URL;
const userLog = require("./routes/login");
const product = require("./routes/products");
const flash = require('express-flash')
const { checkAuthenticated, checkNotAuthenticated } = require('./routes/login');

const app = express();
app.use(express.json());
app.use(cors());
app.set("view-engine", "ejs");
app.use(flash());

mongoose.connect(db_url);
const db = mongoose.connection;
db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));

// Home page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Registration page
app.get("/register", (req, res) => {
  res.render("signup.ejs");
});

// Home page with authentication check
app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
});

// Login page with authentication check
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
});

// User routes
app.use("/register", userRouter);
app.use("/login", userLog);

// Product routes
app.use("/product", product);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, () => {
  console.log("Server is running on port", port);
});
