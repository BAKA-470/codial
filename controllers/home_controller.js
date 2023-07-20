const Post = require('../models/post');

// module.exports.home = function(req, res) {
//     // console.log(req.cookies);

//     Post.find({}, async function(err, posts) {
//         const data = await ('home', {
//             title: 'Codial|Home',
//             posts: posts
//         });
//         return res.render({...data });

//     });
// }
module.exports.home = async function(req, res) {
    try {
        const posts = await Post.find({}).populate('user');

        const data = {
            title: 'Codial | Home',
            posts: posts
        };

        return res.render('home', data);
    } catch (err) {
        console.error('Error fetching posts:', err);
        return res.status(500).json({ error: 'An error occurred while fetching posts' });
    }
};