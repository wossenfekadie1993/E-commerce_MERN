const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

router.use(express.urlencoded({ extended: true }));

// Getting all
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting one
router.get('/user/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Creating one
router.post('/register', async (req, res) => {
    try {
        console.log("Password:", req.body);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        console.log("Error:", err);
        res.redirect('/register');
    }
});

// Updating one
router.patch('/user/:id', getUser, async (req, res) => {
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

// Deleting one
router.delete('/user/:id', async (req, res) => {
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

// Get user function
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

module.exports = router;
