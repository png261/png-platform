const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate/comment');
const catchForm = require('../utils/catchForm');
const Comment = require('../models/Comment');
const User = require('../models/User');

//@route GET api/posts/:postId/comment
//@desc Get all comment of current post id
//@access Public
router.get('/:postId/comment', validate.get, (req, res) => {
    catchForm(req, res, async () => {
        const { postId } = req.params;
        const { page, limit } = req.query;
        const count = await Comment.find({ postId }).count();
        let comments = await Comment.find({ postId }, null, {
            skip: page * limit,
            limit: +limit,
            sort: {
                createdAt: -1,
            },
        }).populate('user', 'username');

        res.json({ success: true, newData: comments, count });
    });
});

//@route POSTS api/posts/:postId/comment
//@desc Create comment
//@access Private
router.post('/:postId/comment', validate.create, async (req, res) => {
    catchForm(req, res, async () => {
        const { postId } = req.params;
        let newComment = new Comment({
            user: req.validate.userId,
            postId: req.params.postId,
            content: req.body.content,
        });
        newComment = await newComment.save();
        const user = await User.findById(req.validate.userId);
        newComment.user = user;

        const io = req.app.get('socket.io');
        io.to(postId).emit('createdComment', newComment);

        res.json({ success: true, message: 'Comment created' });
    });
});

// //@route DELETE api/post:postId/comment
// //@desc Delete comment by cuid
// //@access Private
// router.delete(
//     '/:postId/comment/:id',
//     [verifyToken, isExistPost],
//     async (req, res) => {
//         catchForm(req, res, async () => {
//             const comment = await Comment.findById(req.params.id);
//             if (!comment) {
//                 return res
//                     .status(404)
//                     .json({ success: false, message: 'Comment not found' });
//             }

//             if (comment.userId != req.userId) {
//                 return res
//                     .status(403)
//                     .json({ success: false, message: 'Permission denied' });
//             }

//             await Comment.findOneAndDelete({
//                 _id: req.params.id,
//                 userId: req.userId,
//             });

//             res.json({
//                 success: true,
//                 message: `Comment ${req.params.id} has been deleted`,
//             });
//         });
//     }
// );

module.exports = router;
