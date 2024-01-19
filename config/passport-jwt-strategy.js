const passport = require('passport');
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'codial';

passport.use(new JWTStrategy(opts, async(jwtPayload, done) => {
    try {
        const user = await User.findById(jwtPayload._id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        console.log('Error in finding the user from JWT:', err);
        return done(err, false);
    }
}));


module.exports = passport;