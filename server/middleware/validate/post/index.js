const check = require('./check');
const handle = require('./handle');
const verifyToken = require('../verifyToken');

const getPost = async (req, res, next) => {
    await handle.getPost(req, res);
    next();
};

const getUserPosts = async (req, res, next) => {
    await handle.getUserPosts(req, res);
    next();
};

const create = async (req, res, next) => {
    await verifyToken(req, res);
    check.create(req, res);
    next();
};

const update = async (req, res, next) => {
    await verifyToken(req, res);
    handle.update(req, res);
    next();
};

const remove = update;

const vote = async (req, res, next) => {
    await verifyToken(req, res);
    await handle.vote(req, res);
    next();
};

module.exports = {
    getPost,
    getUserPosts,
    create,
    update,
    remove,
    vote,
};
