const catchForm = require('../../../utils/catchForm');
const handle = require('./handle');

const get = async (req, res, next) => {
    catchForm(req, res, async () => {
        await handle.get(req, res);
        next();
    });
};

module.exports = { get };
