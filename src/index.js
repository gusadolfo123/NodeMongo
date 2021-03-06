// modulo principal de la aplicacion
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// Initializations
const app = express();
require('./database'); 
require('./config/passport');

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
}));

// configuracion para authentication
app.use(passport.initialize());
app.use(passport.session()); // para que use session de expres

// para enviar mensajes entre controlador y vista
app.use(flash());

app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, 'public'))); // se define la ruta deonde estan los archivos estaticos

// Global Variables

//para habilitar mensajes en todas las vistas
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));


// Server Running
app.listen(app.get('port'), () => {
    console.log(`Server is Running in Port ${app.get('port')}`);
});

