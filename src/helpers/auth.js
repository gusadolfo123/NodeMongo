const helpers = {};

// funcion para validar si usuario esta autenticado
helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }else{
        req.flash('error_msg', 'Not Authorized');
        res.redirect('/users/signin');
    }

};

module.exports = helpers;