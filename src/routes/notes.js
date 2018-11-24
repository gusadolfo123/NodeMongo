const express = require('express');
const router = express.Router();
const notesController = require('../controllers/note.controller');
const { isAuthenticated } = require('../helpers/auth');

//ver formulario
router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});
router.get('/notes', isAuthenticated, notesController.getNotes);
router.post('/notes/new-note', isAuthenticated, notesController.createNote);
router.get('/notes/edit/:id', isAuthenticated, notesController.editNote);
router.put('/notes/edit-note/:id', isAuthenticated, notesController.updateNote);
router.delete('/notes/delete/:id', isAuthenticated, notesController.deleteNote);



module.exports = router;