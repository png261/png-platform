const Post = require('../../../models/Post');
const catchForm = require('../../../utils/catchForm');

const getPost = async (req, res) => {
    await catchForm(req, res, async () => {
        const post = await Post.findOne({ _id: req.params.id });

        if (!post) {
            return res
                .status(404)
                .json({ success: false, message: 'Post not found' });
        }

        req.validate = { ...req.validate, post };
    });
};

const getUserPosts = async (req, res) => {
    await catchForm(req, res, async () => {
        const userId = req.params.id;
        const isExistUser = await User.findById(userId);
        if (!isExistUser) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found' });
        }

        const posts = await Post.find({ userId, status: 'PUBLIC' }, null, {
            limit: 20,
        });
        if (posts.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: 'User has no post' });
        }

        req.validate = { ...req.validate, posts };
    });
};

const update = async (req, res) => {
    await catchForm(req, res, async () => {
        const postId = req.params.id;
        const post = await Post.findById(postId);
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
    });
};

const vote = async (req, res) => {
    await catchForm(req, res, async () => {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res
                .status(404)
                .json({ success: false, message: 'Post not found' });
        }

        req.validate = { ...req.validate, post };
    });
};

module.exports = { getPost, getUserPosts, update, vote };
