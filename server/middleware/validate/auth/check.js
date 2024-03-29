const Joi = require('joi');
const checkRequest = require('../checkRequest');

const update = (req, res, next) => {
    const schema = Joi.object({
        newUsername: Joi.string().min(6).required(),
        newPassword: Joi.string().allow('').min(6).optional(),
    });
    checkRequest(req, res, next, schema);
};

const login = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    checkRequest(req, res, next, schema);
};

const register = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
        password_confirm: Joi.string().valid(Joi.ref('password')).required(),
    });
    checkRequest(req, res, next, schema);
};

module.exports = {
    update,
    login,
    register,
};
