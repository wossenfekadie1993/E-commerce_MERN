const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const methodOverride = require("method-override");

const app = express();

// Initialize Passport configuration
const initializePassport = require("../passport-config");
initializePassport(passport,
  async (email) => {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (err) {
      console.error("Error finding user:", err);
      return null;
    }
  },
  async (id) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (err) {
      console.error("Error finding user:", err);
      return null;
    }
  }
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Provide a fallback secret
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(express.json()); // Add JSON middleware

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.delete("/logout", (req, res) => {
  req.logout(); // Use req.logout() instead of req.logOut()
  res.redirect("/login");
});

// Getting all users
app.get("/", checkAuthenticated, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one user
app.get("/:id", checkAuthenticated, getUser, (req, res) => {
  res.json(res.user);
});

// Creating a user
app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    console.error("Error registering user:", err);
    res.redirect("/register");
  }
});

// Updating a user
app.patch("/:id", checkAuthenticated, getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    res.user.password = hashedPassword;
  }

  try {
    const updateUser = await res.user.save();
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting a user
app.delete("/:id", checkAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

// Middleware to check if authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

// Middleware to check if not authenticated
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

module.exports = {
    app,checkNotAuthenticated,checkAuthenticated};
