const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const validate = require('../middleware/validate/post');
const catchForm = require('../utils/catchForm');

//@route GET api/post
//@desc Get all post
//@access Public
router.get('/', async (req, res) => {
    await catchForm(req, res, async () => {
        const posts = await Post.find({ status: 'PUBLIC' }, null, {
            limit: 20,
        });
        res.json({ success: true, posts });
    });
});

//@route GET api/post/:id
//@desc Get a post by cuid
//@access Public
router.get('/:id', validate.getPost, (req, res) => {
    res.json({ success: true, post: req.validate.post });
});

//@route GET api/post/user/:id
//@desc Get all post of user
//@access Public
router.get('/user/:id', validate.getUserPosts, async (req, res) => {
    res.json({ success: true, posts: req.validate.posts });
});

//@route POSTS api/post/
//@desc Create a post
//@access Private
router.post('/', validate.create, async (req, res) => {
    catchForm(req, res, async () => {
        const { title, content } = req.body;
        let newPost = new Post({ userId: req.userId, title, content });
        newPost = await newPost.save();

        res.json({ success: true, message: 'Post created', newPost });
    });
});

//@route PATCH api/post/:id
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

//@route DELETE api/post/:id
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

//@route POST api/post:id/vote
//@desc Upvote post by cuid
//@access Private
router.post('/vote', validate.vote, async (req, res) => {
    catchForm(req, res, async () => {
        const { post } = req.validate;

        if (post.upVote.includes(req.userId)) {
            await post.updateOne({
                $pull: { vote: req.userId },
            });
            return res.json({ success: true, message: 'Un-vote successfully' });
        }

        await post.updateOne({
            $push: { vote: req.userId },
        });

        return res.json({ success: true, message: 'Vote successfully' });
    });
});

module.exports = router;
