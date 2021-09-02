const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const User = require('../models/User');
const passport = require('passport');
const validate = require('../middleware/validate/auth');
const catchForm = require('../utils/catchForm');

//@route GET api/auth
//@desc Check if user is logged in
//@access Public
router.get('/', validate.load, (req, res) => {
    res.json({ success: true, user: req.validate.user });
});

//@route PATCH api/auth
//@desc Update username
//@access Private
router.patch('/', validate.update, async (req, res) => {
    await catchForm(req, res, async () => {
        const { userId, user } = req.validate;
        const hashedPassword = newPassword
            ? await argon2.hash(newPassword)
            : user.password;

        await User.findOneAndUpdate(
            { _id: userId },
            {
                username: newUsername,
                password: hashedPassword,
            }
        );

        res.json({ success: true, message: `Account updated successfully` });
    });
});

//@route POST api/auth/register
//@desc Register user
//@access Public
router.post('/register', validate.register, async (req, res) => {
    await catchForm(req, res, async () => {
        const { email, username, password } = req.body;
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({
            email,
            username,
            password: hashedPassword,
        });
        await newUser.save();

        // Return token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: 'User created successfully',
            accessToken,
        });
    });
});

//@route POST api/auth/login
//@desc Login user
//@access Public
router.post('/login', validate.login, async (req, res) => {
    await catchForm(req, res, async () => {
        const { user } = req.validate;

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACESS_TOKEN_SECRET
        );
        res.json({
            success: true,
            message: 'Login successfully',
            accessToken,
        });
    });
});

// @desc    Auth with Google
// @route   GET api/auth/google
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @desc   Google auth callback
// @route  GET api/auth/google/callback
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.json({ success: true, message: 'Login successful' });
});

// @desc   Logout user
// @route  /auth/logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;