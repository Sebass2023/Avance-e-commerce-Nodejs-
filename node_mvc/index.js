//llamar a la db
const mongoose = require('mongoose');
require('./config/database');

const express = require('express');
const routes = require('./routes');
const path = require('path');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./config/passport');
const MongoStore = require('connect-mongo');
const expressValidator = require('express-validator');

//crear express app
const app = express();

//registrar solicitudes entrantes
app.use((req, res, next) => {
    console.log(`Solicitud recibida: ${req.method} ${req.url}`);
    next();
});

// habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//archivos estaticos
app.use(express.static('public'))

//validar campos
app.use(expressValidator());

//crear sesion 
app.use(cookieParser());

app.use(session({
    secret:'secreto',
    key:'contraseña',
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({mongoUrl:'mongodb+srv://memsito2003:Pitochu.88@tienda.5q2evxb.mongodb.net/Tienda'})
}))

//agregar passport
app.use(passport.initialize());
app.use(passport.session());

//agregar flash message
app.use(flash());

//middleware propio
app.use((req,res,next)=>{
    res.locals.usuario = {...req.user} || null;
    res.locals.mensajes = req.flash();
    next();
})

//iniciar pug
app.set('view engine', 'pug');

//llamar carpeta de views
app.set('views', path.join(__dirname,'./views'));

//llamar a todas las rutas
app.use('/', routes());

//puerto en el que se ejecuta
app.listen(3000);