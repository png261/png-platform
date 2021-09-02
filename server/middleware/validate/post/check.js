const Joi = require('joi');
const checkRequest = require('../checkRequest');

const create = (req, res) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
    });
    checkRequest(req, res, schema);
};

module.exports = { create };
