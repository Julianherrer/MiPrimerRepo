const mongoose= require('mongoose');
const {Schema} = mongoose;
//modelo de las notas para la BD
const NoteSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    user: {type: String},
    date: { type: Date, default: Date.now}
    
});

module.exports = mongoose.model('Note', NoteSchema);