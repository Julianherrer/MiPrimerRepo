//mongoose es el conector que tiene express, con la BD

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notes-db-app',{
    //useCreateIndex:true,
    //useNewUrlParser:true,
    //useFindAndModify:false
})

.then(db => console.log('DB si connected'))
.catch(err=> console.error(err));