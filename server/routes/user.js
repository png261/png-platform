const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate/user');

//@route GET api/user/:id
//@desc Get user info by id
//@access Public
router.get('/:id', validate.get, (req, res) => {
    res.json({ success: true, user: req.validate.user });
});

module.exports = router;
