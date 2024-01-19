const passport = require('passport');
// const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passReqToCallback: true
// }, async(email, password, done) => {
//     // find user
//     const user = await User.findOne({ email: email });
//     if (user && user.password === password) {
//         return done(null, user);
//     } else {
//         req.flash('error', 'Incorrect Username and /or Password')
//         return done(new Error('Incorrect Username and /or Password'));
//     }
// }));

passport.use(
    new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true,
        },
        async(req, email, password, done) => {
            try {
                // Find user by email
                const user = await User.findOne({ email: email });

                if (!user) {
                    req.flash('error', 'Incorrect Username and/or Password');
                    return done(null, false, { message: 'Incorrect Username and/or Password' });
                }

                // Compare the provided password with the password stored in the database
                if (user.password !== password) {
                    req.flash('error', 'Incorrect Username and/or Password');
                    return done(null, false, { message: 'Incorrect Username and/or Password' });
                }

                // Authentication succeeded
                return done(null, user);
            } catch (err) {
                console.error('Error in finding the user ==> Passport', err);
                return done(err);
            }
        }
    )
);



// serializing the user to decide which key to keep in cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done) {
    const user = await User.findById(id);
    if (!user) {
        console.log('Error in finding the user');
        return done(new Error('User not found'));
    }
    return done(null, user);
});

// passport.deserializeUser(function(id, done) {
//     User.findById(id).then((err, user) => {
//         if (err) {
//             console.log('Error in finding the user');
//             return done(err);
//         }
//         return done(null, user);
//     });
// });

// Check if the user is authenticated
passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // if user is not signed in
    return res.redirect('/users/sign-in');
}




passport.setAuthenticateUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;