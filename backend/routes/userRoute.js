const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

// Register
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        return res.status(200).json(user._id);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        // Find user
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ message: "Wrong credentials!" });
        }

        // Validate password
        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            return res.status(400).json({ message: "Wrong credentials!" });
        }

        // Send response
        return res.status(200).json({ _id: user._id, username: user.username });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
