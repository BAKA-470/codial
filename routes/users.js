const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/user_controller');

// router.get('/profile/:id', function(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     // if user is not signed in
//     return res.redirect('/users/sign-in');
// }, usersController.profile);
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);


router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);
<<<<<<< HEAD
router.post('/create-session', passport.authenticate(
    'local', { failureRedirect: '/users/sign-in' },
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);
=======
router.post('/create-session', usersController.createSession);
>>>>>>> master

module.exports = router;