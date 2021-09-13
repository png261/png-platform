const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const validate = require('../middleware/validate/post');
const catchForm = require('../utils/catchForm');

//@route GET api/posts
//@desc Get all post
//@access Public
router.get('/', async (req, res) => {
    await catchForm(req, res, async () => {
        const { page, limit } = req.query;
        const count = await Post.find({ status: 'PUBLIC' }).count();
        const posts = await Post.find({ status: 'PUBLIC' }, null, {
            skip: page * limit,
            limit: +limit,
        }).populate('user', 'username');
        res.json({ success: true, newData: posts, count });
    });
});

//@route GET api/posts/:id
//@desc Get a post by cuid
//@access Public
router.get('/:id', validate.getPost, (req, res) => {
    const { post } = req.validated;
    res.json({ success: true, post });
});

//@route GET api/posts/user:id
//@desc Get all post of user
//@access Public
router.get('/user/:id', validate.getUserPosts, (req, res) => {
    const { posts, count } = req.validated;
    res.json({ success: true, newData: posts, count });
});

//@route POSTS api/posts/
//@desc Create a post
//@access Private
router.post('/', validate.create, async (req, res) => {
    catchForm(req, res, async () => {
        const { userId } = req.validated;
        const { title, content } = req.body;
        let newPost = new Post({ userId, title, content });
        newPost = await newPost.save();
        res.json({ success: true, message: 'Posts has been created', newPost });
    });
});

//@route PATCH api/posts/:id
//@desc Update post by cuid
//@access Private
router.patch('/:id', validate.update, async (req, res) => {
    catchForm(req, res, async () => {
        const updatedPost = await Post.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.userId,
            },
            req.body
        );
        res.json({
            success: true,
            post: updatedPost,
        });
    });
});

//@route DELETE api/posts/:id
//@desc Delete post by cuid
//@access Private
router.delete('/:id', validate.remove, async (req, res) => {
    catchForm(req, res, async () => {
        await Post.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId,
        });

        await Comment.deleteMany({
            postId: req.params.id,
        });

        res.json({
            success: true,
            message: `Post ${req.params.id} has been deleted`,
        });
    });
});

//@route POST api/posts/:id/vote
//@desc Upvote post by cuid
//@access Private
router.post('/:id/vote', validate.vote, async (req, res) => {
    catchForm(req, res, async () => {
        const { post, userId } = req.validated;
        const postId = req.params.id;

        let query = {
            $push: { vote: userId },
        };
        let message = 'Vote successfully';

        if (post.vote.includes(userId)) {
            query = {
                $pull: { vote: userId },
            };
            message = 'Un-vote successfully';
        }

        const { vote } = await Post.findOneAndUpdate({ _id: postId }, query, {
            new: true,
        });

        const io = req.app.get('socket.io');
        io.to(postId).emit('updateVote', vote);

        return res.json({
            success: true,
            message,
        });
    });
});

module.exports = router;
