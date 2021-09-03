const check = require('./check');
const handle = require('./handle');
const verifyToken = require('../verifyToken');
const catchForm = require('../../../utils/catchForm');

const load = async (req, res, next) => {
    await catchForm(req, res, async () => {
        await verifyToken(req, res);
        await handle.load(req, res);
    });

    next();
};

const update = async (req, res, next) => {
    await catchForm(req, res, async () => {
        await verifyToken(req, res);
        check.update(req, res);
        await handle.update(req, res);
    });

    next();
};

const login = async (req, res, next) => {
    await catchForm(req, res, async () => {
        check.login(req, res);
        await handle.login(req, res);
    });

    next();
};

const register = async (req, res, next) => {
    await catchForm(req, res, async () => {
        check.register(req, res);
        await handle.register(req, res);
    });

    next();
};

module.exports = {
    load,
    update,
    login,
    register,
};
