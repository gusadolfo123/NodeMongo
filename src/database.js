// modulo de conexion a la base de datos
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notes-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then( db => console.log('db is Connect') ).catch( err => console.log(err) );


