const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const verifyToken = require('../middleware/validate/verifyToken');

const isExistPost = async (req, res, next) => {
    catchForm(req, res, async () => {
        const isExistPost = await Post.findById(req.params.postId);

        if (!isExistPost) {
            return res
                .status(404)
                .json({ success: false, message: 'Post not found' });
        }

        next();
    });
};

//@route GET api/post:postId/comment
//@desc Get all comment of current post id
//@access Public
router.get('/:postId/comment', isExistPost, async (req, res) => {
    catchForm(req, res, async () => {
        const comments = await Comment.find({ postId: req.params.postId });
        res.json({ success: true, comments });
    });
});

//@route POSTS api/post:postId/comment
//@desc Create comment
//@access Private
router.post(
    '/:postId/comment',
    [verifyToken, isExistPost],
    async (req, res) => {
        catchForm(req, res, async () => {
            const { content } = req.body;

            if (!content) {
                return res.status(400).json({
                    success: false,
                    message: 'content is required',
                });
            }

            let newComment = new Comment({
                userId: req.userId,
                postId: req.params.postId,
                content,
            });
            newComment = await newComment.save();

            res.json({ success: true, message: 'Comment created', newComment });
        });
    }
);

//@route DELETE api/post:postId/comment
//@desc Delete comment by cuid
//@access Private
router.delete(
    '/:postId/comment/:id',
    [verifyToken, isExistPost],
    async (req, res) => {
        catchForm(req, res, async () => {
            const comment = await Comment.findById(req.params.id);
            if (!comment) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Comment not found' });
            }

            if (comment.userId != req.userId) {
                return res
                    .status(403)
                    .json({ success: false, message: 'Permission denied' });
            }

            await Comment.findOneAndDelete({
                _id: req.params.id,
                userId: req.userId,
            });

            res.json({
                success: true,
                message: `Comment ${req.params.id} has been deleted`,
            });
        });
    }
);

module.exports = router;
