const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user', require: true },
    postId: { type: Schema.Types.ObjectId, ref: 'post', require: true },
    content: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('comment', CommentSchema);
