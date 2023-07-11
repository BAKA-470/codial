module.exports.profile = function(req, res) {
    return res.render('user1', {
        title: 'user1'
    });
}

// rendering the sign up page
module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title: 'Codial|Sign Up'
    })
};
// rendering the sign in page
module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title: 'Codial|Sign In'
    })
};
// getting the signup data
module.exports.create = function(req, res) {
        // will work on it in a while
    }
    // creating a session while signing in
module.exports.createSession = function(req, res) {
    // will work on it in a while
}