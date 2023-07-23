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