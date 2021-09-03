const Joi = require('joi');
const checkRequest = require('../checkRequest');

const create = (req, res) => {
    const schema = Joi.object({
        content: Joi.string().required(),
    });
    checkRequest(req, res, schema);
};

module.exports = { create };
