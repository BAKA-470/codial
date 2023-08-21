module.exports.index = (req, res) => {
    return res.json(200, {
        message: 'Welcome to the API',
        status_code: 1,
        data: {
            post1: "this post",
            post2: "this is another one"
        }
    })
}