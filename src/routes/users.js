const express = require('express');
const router = express.Router();

// para authenticacion
router.get('/users/signin', (req, res) => {
    res.send('Ingreso a la App');
});

// para authenticacion
router.get('/users/signup', (req, res) => {
    res.send('Formulario de Autenticacion');
});

module.exports = router;