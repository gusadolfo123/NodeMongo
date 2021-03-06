const Note = require('../models/Note');
const noteCtrl = {};

noteCtrl.getNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user.id }).sort({ date: 'desc' });
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
        const newNote = new Note({ title, description, });
        newNote.user = req.user.id;
        await newNote.save();

        // uso de flash para enviar mensajes
        req.flash('success_msg', 'Note Added Successfully');

        res.redirect('/notes');
    }
    
};

noteCtrl.editNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', { note });
};

noteCtrl.updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(id, { title, description }, {new: true});
    
    // uso de flash para enviar mensajes
    req.flash('success_msg', 'Note Updated Successfully');

    res.redirect('/notes');
};

noteCtrl.deleteNote = async (req, res) => {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    
    // uso de flash para enviar mensajes
    req.flash('success_msg', 'Note deleted Successfully');

    res.redirect('/notes');
};

module.exports = noteCtrl;