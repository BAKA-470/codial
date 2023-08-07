const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = async function(req, res) {
    try {
        const user = await User.findById(req.params.id);


        return res.render('user1', {
            title: 'user1',
            profile_user: user
        });
    } catch (err) {
        console.error('Error fetching your request:', err);
        return res.status(500).json({ error: 'An error occurred while fetching your request' });
    }

};




module.exports.update = async function(req, res) {
    try {
        // Check if the current user is authorized to update the profile
        if (req.user.id !== req.params.id) {
            return res.status(401).send('Unauthorized');
        }
        let user = await User.findById(req.params.id);
        User.uploadedAvatar(req, res, function(err) {
            if (!err && !req.file) {
                console.log('*****************Multer error***********', err);
            }
            user.name = req.body.name;
            user.email = req.body.email;

            if (req.file) {
                if (user.avatar) {
                    fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                }
                user.avatar = User.avatarPath + '/' + req.file.filename


            }
            user.save();
            req.flash('success', 'Updated');
            return res.redirect('back');
        })

        // Find the user by ID and update the user data
        // const updatedUser = await User.findOneAndUpdate({ _id: req.params.id },

        //     req.body, {
        //         new: true, // Return the updated user after the update
        //         runValidators: true, // Run Mongoose validators on the update data
        //     }
        // ).exec();

        // Check if the user exists and was updated successfully
        // if (!updatedUser) {
        //     return res.status(404).send('User not found or unable to update.');
        // }

        // Redirect back to the previous page or send a success message

        // return res.redirect('back'); // Or send a success message, e.g., res.status(200).send("User updated successfully.");
    } catch (err) {
        // Handle any errors that occurred during the process
        console.error('Error updating user:', err);
        return res.status(500).send('An error occurred while updating the user.');
    }
};



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
                        req.flash('success', 'Welcome new user,Please log in');
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

};

// creating a session while signing in
module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');

}

module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) { return (err); }
        res.redirect('/users/profile');
    });
    req.flash('success', 'You were logged out');

    return res.redirect('/users/sign-in');
}