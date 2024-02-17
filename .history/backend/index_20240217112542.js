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
// const jwt =require('jsonwebtoken');
// const multer =require('multer');
// const path=require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.set("view-engine", "ejs");
app.use(flash())
mongoose.connect(db_url);
const db = mongoose.connection;
db.on("error", (error) => console.log(error()));
db.once("open", () => console.log("connection establish to database"));

// home page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/register", (req, res) => {
  res.render("signup.ejs");
});
const {checkNotAuthenticated,checkNotAuthenticated} =requ
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
  })
  
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
 

// //protected
// app.get("/protected", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send("Protected");
//   } else {
//     res.status(401).send({ msg: "Unauthorized" });
//   }
//   console.log(req.session);
//   console.log(req.user);
// });


//user route

app.use("/register", userRouter);
app.use("/login", userLog);

//product route
app.use("/product", product);

//listening on given port
app.listen(port, (error) => {
  if (!error) {
    console.log("app is running on port", port);
  } else {
    console.log(error);
  }
});
