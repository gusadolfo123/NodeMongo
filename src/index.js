// modulo principal de la aplicacion
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

// Initializations
const app = express();
require('./database'); 

// Settings
app.set('port', process.env.PORT || 5500);

// configurar para que node sepa que las views estan en src/views
app.set('views', path.join(__dirname, 'views'));

// congurar el motor de vistas handlerbars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs'); // se implementa el motor de vistas


// Middlewares
// urlencoded se usa para reconocer los datos de un formulario extended para aceptar imagenes en caso de ser verdadero
app.use(express.urlencoded({ extended: false }));

// para que los formularios envien otros tipos de metodos a GET o POST
app.use(methodOverride('_method'));

//sessiones
app.use(session({
    secret: 'mySecretApp',
    resave: true,
    saveUninitialized: true
}))

app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Global Variables

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));


// Server Running
app.listen(app.get('port'), () => {
    console.log(`Server is Running in Port ${app.get('port')}`);
});

