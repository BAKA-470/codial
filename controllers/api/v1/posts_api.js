const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req, res) {

    let posts = await Post.find({}).sort('-createdAt').populate('user').populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });


    return res.status(200).json({
        message: 'List of posts',
        posts: posts
    })
}

module.exports.destroy = async function(req, res) {
    try {
        // Ensure the user is authenticated before proceeding
        // if (!req.user) {
        //     return res.status(401).send("You are not authenticated.");
        // }

        // Find the post by ID and populate its 'user' field
        const post = await Post.findById(req.params.id).populate('user').exec();

        // Check if the post exists
        // if (!post) {
        //     return res.status(404).send("Post not found.");
        // }

        // Check if the current user is the author of the post
        if (post.user.id == req.user.id) {
            await Promise.all([
                post.deleteOne(), // Use 'deleteOne()' to delete the post from the database
                Comment.deleteMany({ post: req.params.id }),
            ]);
            return res.status(200).json({
                message: 'Post and associated comments deleted successfully!!!'
            });

        } else {
            return res.status(401).json({
                message: "You can't delete this post "
            });
        };







        // Redirect back to the previous page after successful deletion

    } catch (err) {
        // Handle any errors that occurred during the process
        // req.flash('error', err);
        // console.error("Error deleting post:", err);
        return res.status(500).json({
                message: 'internal server error'
            })
            // return res.status(500).send("An error occurred while deleting the post.");
    }
};