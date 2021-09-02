const jwt = require('jsonwebtoken');

const verifyToken = (req, res) => {
    const authHeader = req.header('Authorization'); // Authorization: Bearer <token>
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: 'Aceess token not found' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACESS_TOKEN_SECRET);
        req.validate = { ...req.validate, userId: decoded.userId };
    } catch (error) {
        console.log(error);
        return res
            .status(403)
            .json({ success: false, message: 'Invalid token' });
    }
};

module.exports = verifyToken;
