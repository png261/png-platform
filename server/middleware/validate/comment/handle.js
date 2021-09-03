const Post = require('../../../models/Post');

const isExistPost = async (req, res) => {
    const isExistPost = await Post.findById(req.params.postId);
    if (!isExistPost) {
        return res
            .status(404)
            .json({ success: false, message: 'Post not found' });
    }
};

const get = isExistPost;
const create = isExistPost;

module.exports = {
    get,
    create,
};
