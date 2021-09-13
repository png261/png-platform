const Post = require('../../../models/Post');
const User = require('../../../models/User');

const getPost = async (req, res, next) => {
    const post = await Post.findOne({ _id: req.params.id }).populate(
        'user',
        'username'
    );
    if (!post) {
        return res
            .status(404)
            .json({ success: false, message: 'Post not found' });
    }

    req.validated = { ...req.validated, post };
    next();
};

const getUserPosts = async (req, res, next) => {
    const userId = req.params.id;
    const { page, limit } = req.query;

    const isExistUser = await User.findById(userId);
    if (!isExistUser) {
        return res
            .status(404)
            .json({ success: false, message: 'User not found' });
    }

    const count = await Post.find({ userId, status: 'PUBLIC' }).count();
    const posts = await Post.find({ userId, status: 'PUBLIC' }, null, {
        skip: page * limit,
        limit: +limit,
    }).populate('user', 'username');

    req.validated = { ...req.validated, posts, count };
    next();
};

const update = async (req, res, next) => {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate('user', 'username');
    if (!post) {
        return res
            .status(404)
            .json({ success: false, message: 'Post not found' });
    }
    if (post.userId != req.userId) {
        return res
            .status(403)
            .json({ success: false, message: 'Permission denied' });
    }

    next();
};

const vote = async (req, res, next) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
        return res
            .status(404)
            .json({ success: false, message: 'Post not found' });
    }

    req.validated = { ...req.validated, post };
    next();
};

module.exports = { getPost, getUserPosts, update, vote };
