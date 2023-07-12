const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    // find user
    const user = await User.findOne({ email: email });
    if (user && user.password === password) {
        return done(null, user);
    } else {
        return done(new Error('Incorrect Username and /or Password'));
    }
}));
// passport.use(new LocalStrategy({
//         usernameField: 'email'
//     },
//     function(email, password, done) {
//         // find user
//         User.findOne({ email: email }).then(function(err, user) {
//             if (err) {
//                 console.log('Error in finding the user ==> Passport');
//                 return done(err);
//             }
//             if (!user || user.password != password) {
//                 console.log("Invalid Email or Password");
//                 return done(null, false, { message: 'Incorrect Username and /or Password' });
//             }

//             return done(null, user);
//         });
//     }
// ));

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
passport.checkAthentication = function(req, res, next) {
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