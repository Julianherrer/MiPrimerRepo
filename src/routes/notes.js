const express = require('express');
const res = require('express/lib/response');
const { render } = require('express/lib/response');
const router = express.Router();

//llamo a helpers
const {isAuthenticated} = require('../helpers/auth');

//instancia de BD
const Note= require('../models/Note');
const User = require('../models/User');

//llamado al servidor
router.get('/notes/add', isAuthenticated, (req,res)=>{
    res.render('notes/new-note.hbs');
});

//find busca los datos en la BD    lean codifica los datos para mostrarlos en la app, sort ordena por fecha 
router.get('/notes', isAuthenticated, async (req,res)=>{
    const notes = await Note.find({user: req.user.id}).lean().sort({date: 'desc'});
    const user = await User.find({user: req.user.id}).lean();
    console.log(user);
    res.render('notes/all-notes', {notes});
});

router.get('/notes/edit/:id',async (req,res)=>{
    const note = await Note.findById(req.params.id).lean();
    console.log({note});
    res.render('notes/edit-note', {note});
    
});

//editar una note
router.put('/notes/edit-note/:id',async (req,res)=>{
    const {title, description} = req.body;
   await Note.findByIdAndUpdate(req.params.id, {title, description}).lean();
   res.redirect('/notes');

});

//eliminar una nota
router.delete('/notes/delete/:id', async (req, res)=>{
    await Note.findByIdAndDelete(req.params.id).lean();
    res.redirect('/notes');
});

//creando una nueva nota en BD
router.post('/notes/new-note',async (req,res)=>{
    //req.body toma los datos que se ingresaron por teclado
    const {title,description}= req.body;
    //crea una constante errores y hace las pruebas, si de lo que ingresaron no hay titulo o descripcion, sale los siguientes errores
    const errors= [];
    if(!title){
        errors.push({text: 'Please write a Title'});
    }
    if(!description){
        errors.push({text: 'Please write a Description'});
    }
    if(errors.length > 0 ){
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    }
    //si pasa el filtro de errores lo guarda en la base de datos
    else{
    const newNote= new Note({title, description});
        newNote.user = req.user.id;
        console.log (newNote);
        await newNote.save();
        req.flash('success_msg', 'Note added Successfully')
        res.redirect('/notes')
    }
});





module.exports = router;