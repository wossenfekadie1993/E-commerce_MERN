const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/users');
const isAdmin = require("../middlewares/admin")
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
// POST request to add a manager with role "Manager"
router.post('/addManager', isAdmin, async (req, res) => {
  try {
    const email = req.body.email;
    const manager = await User.findOne({ email: email });

    if (manager) {
      return res.status(400).json('User(ma) already exists');
    }

    const new_manager = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 6),
      role: 'User',
      address: req.body.address,
      token,
    });

    await new_User.save();
    res.json({
      success: true,
      manager: new_manager,
    });
  } catch (error) {
    res.status(500).json('Error adding manager');
  }
});

// GET request to retrieve all managers with role "Manager"
router.get('/getAllManagers', isAdmin, async (req, res) => {
  try {
    const managers = await User.find({ role: 'Manager' });

    res.json({
      success: true,
      managers: managers,
    });
  } catch (error) {
    res.status(500).json('Error retrieving managers');
  }
});


router.put('/update/:username', isAdmin, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      {
        $set: {
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 6),
          role: 'Manager',
          address: req.body.address,
        },
      },
      { new: true }
    );
    res.json({
      param: req.params.username,
      success: true,
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: 'An unexpected error occurred',
      error: err,
    });
  }
});

router.delete('/delete/:email', isAdmin, async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOneAndDelete({ email: email });

    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
    } else {
      res.status(200).json({
        message: 'Deleted successfully',
        user: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'An unexpected error occurred',
      error: err,
    });
  }
});

module.exports = router;