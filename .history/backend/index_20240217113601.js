const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');
const { checkAuthenticated, checkNotAuthenticated } = require('./login');
const initializePassport = require('../passport-config');

// Middleware setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

// Route setup
app.post('/', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));
app.get("/", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});
// home page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/register", (req, res) => {
  res.render("signup.ejs");
});

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
