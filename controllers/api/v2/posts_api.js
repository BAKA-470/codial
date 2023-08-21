module.exports.index = (req, res) => {
    return res.json(200, {
        message: 'Successfully fetching the list of posts of v2',
        posts: {
            post1: "This is a sample post 1",
            post2: "This is another sample post"
        }
    });
};