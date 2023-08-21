const passport = require('passport');
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'codial'
}

passport.use(new JWTStrategy(opts, async(jwtPayload, done) => {
    const user = await User.findById(jwtPayload._id, (err, user) => {
        if (err) {
            console.log('error in finding the user from JWT');
            return;
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
}));

module.exports = passport;