const userController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();


// para authenticacion
router.get('/users/signin', (req, res) => {
    //res.send('Formulario de Autenticacion');
    res.render('users/signin');
});

router.post('/users/signin', userController.singIn);

// para authenticacion
router.get('/users/signup', (req, res) => {
    //res.send('Formulario de Autenticacion');
    res.render('users/signup');
});

// para authenticacion
router.post('/users/signup', userController.signUp);

router.get('/users/logout', userController.logout);

module.exports = router;