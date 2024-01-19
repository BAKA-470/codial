const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // adding the ids of comments in post schema for reference
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]

}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;