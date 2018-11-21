const express = require('express');
const router = express.Router();

router.get('/notes', (req, res) => {
    res.send('Notas desde la base de datos');
});

router.post('/notes', (req, res) => {
    res.send('Formulario de Autenticacion');
});



module.exports = router;