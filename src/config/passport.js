const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const moongose = require('mongoose');
const User = require('../models/User');

passport.use(new LocalStrategy({
    // indica a traves de que se va a autenticar el usuario
    usernameField: 'email'
}, async (email, password, done) => {

    //verificacion
    const user = await User.findOne({ email: email });

    if (!user) {
        console.log('asd')
        return done(null, false, { message: 'Not User Found' });
    }else{
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        }else{
            return done(null, false, { message: 'Incorrect Password' });
        }
    }
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

