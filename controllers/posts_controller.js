const Post = require('../models/post');


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

        // Handle successful creation
        return res.status(201).redirect('back'); // 201 Created status code for successful creation
    } catch (err) {
        console.error('Error in creating the post', err);
        return res.status(500).json({ error: 'An error occurred while creating the post' });
    }
};