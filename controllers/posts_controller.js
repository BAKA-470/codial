const Post = require('../models/post');
const Comment = require('../models/comment');

// module.exports.create = function(req, res) {
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     }, function(err, post) {
//         if (err) { console.log('Error in creating the post'); return }
//         return res.redirect('back'); // redirect to show page of created post  
//     })
// };
module.exports.create = async function(req, res) {
    try {
        // Validate input data
        if (!req.body.content || typeof req.body.content !== 'string') {
            return res.status(400).json({ error: 'Invalid content provided' });
        }

        // Sanitize input data (if needed)

        // Create the post
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        });
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post Created!!!'
            });
        }
        req.flash('success', 'Post created!!');

        // Handle successful creation
        return res.status(201).redirect('back'); // 201 Created status code for successful creation
    } catch (err) {
        req.flash('error', err);
        // console.error('Error in creating the post', err);
        return res.status(201).redirect('back');
    }
};


module.exports.destroy = async function(req, res) {
    try {
        // Ensure the user is authenticated before proceeding
        if (!req.user) {
            return res.status(401).send("You are not authenticated.");
        }

        // Find the post by ID and populate its 'user' field
        const post = await Post.findById(req.params.id).populate('user').exec();

        // Check if the post exists
        if (!post) {
            return res.status(404).send("Post not found.");
        }

        // Check if the current user is the author of the post
        if (post.user.id !== req.user.id) {
            return res.status(403).send("You don't have permission to delete this post.");
        }

        // Delete the post and associated comments
        await Promise.all([
            post.deleteOne(), // Use 'deleteOne()' to delete the post from the database
            Comment.deleteMany({ post: req.params.id }),
        ]);
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: 'Post Deleted!!'
            });
        }



        req.flash('success', 'Post Deleted!!!');

        // Redirect back to the previous page after successful deletion
        return res.redirect('back');
    } catch (err) {
        // Handle any errors that occurred during the process
        req.flash('error', err);
        // console.error("Error deleting post:", err);
        return res.redirect('back');
        // return res.status(500).send("An error occurred while deleting the post.");
    }
};






// module.exports.destroy = function(req, res) {
//     Post.findById(req.params.id, function(err, post) {
//         if (post.user == req.user.id) {
//             post.remove();

//             Comment.deleteMany({ post: req.parms.id }, function(err) {
//                 return res.redirect('back');
//             });
//         } else {
//             return res.redirect('back')
//         }
//     });
// };