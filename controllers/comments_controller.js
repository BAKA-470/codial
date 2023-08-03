const Comment = require('../models/comment');
const Post = require('../models/post');



// module.exports.create = async function(req, res) {
//     Post.findById(req.body.post, function(err, post) {

//         if (post) {
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err, comment) {
//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect('/');
//             })
//         }
//     });
// }



module.exports.create = async function(req, res) {
    try {
        const postId = req.body.post;
        const post = await Post.findById(postId);

        if (!post) {
            // Handle the case when the post with given ID is not found
            return res.status(404).send('Post not found');
        }

        const commentData = {
            content: req.body.content,
            post: postId,
            user: req.user._id
        };

        const comment = await Comment.create(commentData);
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    comment: comment
                },
                message: 'Comment Created'
            });
        }

        // Ensure the comments property is initialized as an array
        if (!post.comments) {
            post.comments = [];
        }

        post.comments.push(comment);
        await post.save();

        res.redirect('/');
    } catch (err) {
        // Handle any other errors that may occur during the process
        console.error(err);
        res.status(500).send('An error occurred while creating the comment');
    }
};

// Function to delete a single comment on a post
module.exports.destroy = async function(req, res) {
    try {
        // Find the comment by ID
        const comment = await Comment.findById(req.params.id).exec();

        // Check if the comment exists
        if (!comment) {
            return res.status(404).send("Comment not found.");
        }

        // Check if the current user is the author of the comment
        if (comment.user.toString() !== req.user.id) {
            return res.status(403).send("You don't have permission to delete this comment.");
        }

        // Store the post ID to remove the comment reference from the post
        const postId = comment.post;

        // Delete the comment
        await comment.deleteOne();

        // Remove the comment reference from the post
        await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

        // Redirect back to the previous page or send a success message
        return res.redirect('back'); // Or send a success message, e.g., res.status(200).send("Comment deleted successfully.");
    } catch (err) {
        // Handle any errors that occurred during the process
        console.error("Error deleting comment:", err);
        return res.status(500).send("An error occurred while deleting the comment.");
    }
};

// module.exports.destroy = function(req, res) {
//     Comment.findById(req.parms.id, function(err, comment) {
//         if (comment.user == req.user.id) {
//             let postId = comment.post;

//             comment.deleteOne();

//             Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function(err, post) {
//                 return res.redirect('back');
//             });
//         } else {
//             return res.redirect('back');
//         }
//     });
// };