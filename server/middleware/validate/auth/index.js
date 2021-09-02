const check = require('./check');
const handle = require('./handle');
const verifyToken = require('../verifyToken');

const load = async (req, res, next) => {
    await verifyToken(req, res);

    await handle.load(req, res);

    next();
};

const update = async (req, res, next) => {
    await verifyToken(req, res);

    await check.update(req, res);
    await handle.update(req, res);

    next();
};

const login = async (req, res, next) => {
    await check.login(req, res);
    await handle.login(req, res);

    next();
};

const register = async (req, res, next) => {
    await check.register(req, res);
    await handle.register(req, res);

    next();
};

module.exports = {
    load,
    update,
    login,
    register,
};
