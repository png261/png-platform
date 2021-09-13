const check = require('./check');
const handle = require('./handle');
const verifyToken = require('../verifyToken');

const getPost = [handle.getPost];
const getUserPosts = [handle.getUserPosts];
const create = [verifyToken, check.create];
const update = [verifyToken, handle.update];
const remove = update;
const vote = [verifyToken, handle.vote];

module.exports = {
    getPost,
    getUserPosts,
    create,
    update,
    remove,
    vote,
};
