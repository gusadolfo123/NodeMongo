const passport = require('passport');
const User = require('../models/User');
const userCtrl = {};

userCtrl.singIn = passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
});

userCtrl.logout = async (req, res) => {
    req.logout();
    res.redirect('/');
};

/*userCtrl.singIn = async (req, res) => {
    
    const errors = [];
    const { email, password } = req.body;

    if (email.length <= 0) {
        errors.push({ text: 'Please Insert Your Email' });
    }

    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 Characters' });
    }

    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    }else{
        const findUser = User.findOne({ email: email, password: password });
        console.log(findUser);
        if (findUser) {
            res.send('Welcome');
        }else{
            errors.push({ text: 'Usuario Invalido' });
        }
    }

}; */

userCtrl.signUp = async (req, res) => {
    
    const errors = [];

    const { name, email, password, confirm_password } = req.body;

    if (name.length <= 0) {
        errors.push({ text: 'Please Insert Your Name' });
    }

    if (email.length <= 0) {
        errors.push({ text: 'Please Insert Your Email' });
    }

    if (password != confirm_password) {
        errors.push({ text: 'Password do not match'});
    }

    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 Characters' });
    }

    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    }else{
        
        // validar existencia de email
        const emailUser = await User.findOne({email: email});
            
        if (emailUser) {
            req.flash('error_msg', 'The email has ready taken');
            res.redirect('signup');
        }else{
            const newUser = new User({ name, email, password });
            newUser.password =  await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You Are Registered');
            res.redirect('signin');
        }        
    }
};

module.exports = userCtrl;