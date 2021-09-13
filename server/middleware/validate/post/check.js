const Joi = require('joi');
const checkRequest = require('../checkRequest');

const create = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
    });
    checkRequest(req, res, next, schema);
};

module.exports = { create };
