const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user', require: true },
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    vote: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    status: {
        type: String,
        enum: ['PRIVATE', 'PUBLIC'],
        default: 'PUBLIC',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('post', PostSchema);
