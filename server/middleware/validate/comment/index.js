const handle = require('./handle');
const check = require('./check');
const verifyToken = require('../verifyToken');

const get = handle.get;
const create = [verifyToken, check.create, handle.create];

module.exports = {
    get,
    create,
};
