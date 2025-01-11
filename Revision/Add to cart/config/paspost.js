const passport = require('passport')
const passportLocal = require('passport-local').Strategy;

const usreModel = require('../models/userModel');

passport.use(new LocalStrategy({
    usernameField: 'email',
},
    async (email, password, done) => {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));