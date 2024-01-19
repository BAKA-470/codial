module.exports.index = (req, res) => {
    return res.json(200, {
        message: 'Welcome to the API',
        users: {
            user1: ['user.name', 'user.email', ],
            user1: ['user.name', 'user.email', ],
            user1: ['user.name', 'user.email', ]
        },
        posts: {
            user1: ['user.name', 'user.email', 'user.posts'],
            user1: ['user.name', 'user.email', 'user.posts'],
            user1: ['user.name', 'user.email', 'user.posts']
        },
        comments: {
            user1: ['user.name', 'user.email', 'user.comments'],
            user1: ['user.name', 'user.email', 'user.comments'],
            user1: ['user.name', 'user.email', 'user.comments']
        }

    })
}