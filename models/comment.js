const mongoose = require('mongoose');
const { Schema } = mongoose;


const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // saving the id of user who commented
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // saving the post on which the user commented
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;