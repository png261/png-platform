const User = require('../../../models/User')

const get = async (req, res) => {
    const userId = req.params.id
    const user = await User.findById(userId).select('-password');
    if (!user) {
        return res
            .status(404)
            .json({ success: false, message: 'User not found' });
    }

    req.validate = { ...req.validate, user };
};

module.exports = { get }
