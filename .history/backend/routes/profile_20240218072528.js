
const bcrypt = require('bcrypt')
const express = require('express');
const User = require('../models/user');
const profileRouter = express.Router()
const multer = require("multer");
const auth = require("../middlewares/auth");
profileRouter.use(express.json())
profileRouter.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './uploads');
    },
    filename:(req,file,cb)=>{
         cb(null, file.originalname);
        
        }
})


const upload = multer({
    storage:storage
});


// Get users
profileRouter.get("/users",auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single user 
profileRouter.get("/user/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

// update user profile
profileRouter.put("/update/profile/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res
        .status(404)
        .json({ message: `Cannot find a user with ID ${id}` });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json({"updated successfully ":updatedUser});
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

// Delete user profile
profileRouter.delete("/delete/profile/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `Cannot find a user with ID ${id}` });
    }
    res.status(200).json({  "This account has been successfully deleted.":user });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

module.exports = profileRouter;