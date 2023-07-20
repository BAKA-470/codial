const User = require('../models/user');
// const User = require('../models/user');

module.exports.profile = function(req, res) {
    return res.render('user1', {
        title: 'user1'
    });
}

// rendering the sign up page
module.exports.signUp = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: 'Codial|Sign Up'
    })
};
// rendering the sign in page
module.exports.signIn = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('user_sign_in', {
        title: 'Codial|Sign In'
    })
};
// getting the signup data
module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        console.log("Passwords do not match");
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email })
        .then(function(user) {
            if (!user) {
                User.create(req.body)
                    .then((user, err) => {
                        if (err) {
                            console.log('Error in creating user while signing up');
                            return;
                        }
                        return res.redirect('/users/sign-in');
                    });
                // User.create(req.body, function(err, user) {
                //     if (err) { console.log('Error in creating user while signing up'); return }
                //     return res.redirect('/users/sign-in')
                // })
            } else {
                return res.redirect('back');
            }
        });
    // User.findOne({ email: req.body.email }, function(err, user) {
    // if (err) {
    //     console.log('Error in finding the user');
    //     return
    // }
    // if (!user) {
    //     User.create(req.body, function(err, user) {
    //         if (err) { console.log('Error in creating user while signing up'); return }

    //         return res.redirect('/users/sign-in')
    //     })
    // } else {
    //     return res.redirect('back');
    // }
};

// creating a session while signing in
module.exports.createSession = function(req, res) {
    return res.redirect('/');

}

module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) { return (err); }
        res.redirect('/users/profile');
    });

    return res.redirect('/users/sign-in');
}