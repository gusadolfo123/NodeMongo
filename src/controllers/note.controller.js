const Note = require('../models/Note');
const noteCtrl = {};

noteCtrl.getNotes = async (req, res) => {
    const notes = await Note.find().sort({ date: 'desc' });
    res.render('notes/all-notes', { notes });
};

noteCtrl.createNote = async (req, res) => {
    //nueva forma se obtienen atributos de un objeto
    const { title, description } = req.body;
    const errors = [];

    if (!title) {
        errors.push({ text: 'Please write a  title' });
    }

    if (!description) {
        errors.push({ text: 'Please write a  description' });
    }

    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors, 
            title, 
            description
        });
    }else{
        const newNote = new Note({ title, description });
        await newNote.save();

        res.redirect('/notes');
    }
    
};

noteCtrl.editNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', { note });
};


noteCtrl.updateNote = async (req, res) => {
    const { id } = req.params;
    const note = 
    await Note.findByIdAndUpdate(id, {$set: note}, {new: true});

     res.redirect('/');
};

module.exports = noteCtrl;