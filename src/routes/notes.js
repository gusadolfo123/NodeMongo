const express = require('express');
const router = express.Router();
const notesController = require('../controllers/note.controller');


//ver formulario
router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
});
router.get('/notes', notesController.getNotes);
router.post('/notes/new-note', notesController.createNote);
router.get('/notes/edit/:id', notesController.editNote);
router.put('/notes/edit-note/:id', notesController.updateNote);
router.delete('/notes/delete/:id', notesController.deleteNote);



module.exports = router;