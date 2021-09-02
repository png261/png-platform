const catchForm = require('../../../utils/catchForm');
const Post = require('../../../models/Post')
const Comment = require('../../../models/Comment')

const isExistPost = async (req,res) => {
        const isExistPost = await Post.findById(req.params.postId);
        if (!isExistPost) {
            return res
                .status(404)
                .json({ success: false, message: 'Post not found' });
        }
};

const getComments = async (req, res) => {
    await catchForm(req, res, async () => {
        await isExistPost(req,res);

        const comments = await Comment.find({ postId: req.params.postId });
        if (!comments) {
            return res
                .status(404)
                .json({ success: false, message: 'Post not found' });
        }

        req.validate = { ...req.validate, comments };
    });
};

const createComment = async (req, res) => {
    await catchForm(req, res, async () => {
        await isExistPost(req,res);
    });
};

module.exports = {
    createComment,
    getComments
}
