const handle = require('./handle');
const check = require('./check');
const verifyToken = require('../verifyToken');
const catchForm = require('../../../utils/catchForm');

const get = async (req, res, next) => {
    await catchForm(req, res, async () => {
        await handle.get(req, res);
    });
    next();
};

const create = async (req, res, next) => {
    await catchForm(req, res, async () => {
        await verifyToken(req, res);
        check.create(req, res);
        await handle.create(req, res);
    });
    next();
};

module.exports = {
    get,
    create,
};
