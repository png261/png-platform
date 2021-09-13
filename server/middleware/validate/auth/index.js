const check = require('./check');
const handle = require('./handle');
const verifyToken = require('../verifyToken');

const load = [verifyToken, handle.load];
const update = [verifyToken, check.update, handle.update];
const login = [check.login, handle.login];
const register = [check.register, handle.register];

module.exports = {
    load,
    update,
    login,
    register,
};
