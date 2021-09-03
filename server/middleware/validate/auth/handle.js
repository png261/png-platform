const User = require('../../../models/User');
const argon2 = require('argon2');

const load = async (req, res) => {
    const { userId } = req.validate;
    const user = await User.findById(userId).select('-password');
    if (!user) {
        return res
            .status(400)
            .json({ success: false, message: 'User not found' });
    }
    req.validate = { ...req.validate, user };
};

const update = async (req, res) => {
    const { userId } = req.validate;
    const user = await User.findById(userId);
    const isExistsUserName = await User.findOne({
        _id: { $ne: userId },
        username: req.body.newUsername,
    });

    if (!user) {
        return res
            .status(400)
            .json({ success: false, message: 'account does not exist' });
    }

    if (isExistsUserName) {
        return res
            .status(400)
            .json({ success: false, message: 'username already in use' });
    }

    req.validate = { ...req.validate, user };
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'Incorrect email or password',
        });
    }

    const isValidPassword = await argon2.verify(user.password, password);

    if (!isValidPassword) {
        return res.status(400).json({
            success: false,
            message: 'Incorrect email or password',
        });
    }

    req.validate = { ...req.validate, user };
};

const register = async (req, res) => {
    const { email, username } = req.body;
    const isInUseEmail = await User.findOne({ email });
    const isInUseUsername = await User.findOne({ username });

    if (isInUseEmail) {
        return res.status(422).json({
            success: false,
            message: 'email already in use',
        });
    }

    if (isInUseUsername) {
        return res.status(422).json({
            success: false,
            message: 'username already in use',
        });
    }
};

module.exports = { login, register, load, update };
