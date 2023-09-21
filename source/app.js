const express = require('express');
const session = require('express-session');
const cookie = require('cookie-parser');
const {join} = require('path');
const method = require('method-override');
const server = express();
const {port,start} = require('./modules/server');


// Inicio de servidor
server.listen(port, start());

// Configuracion de EJS
server.set ('views', join(__dirname, './views'));
server.set ('view engine', 'ejs')

// Configuracion de archivos estaticos
const statics = require('./modules/static');
server.use(statics(join(__dirname, '../public')));

//Para el req.body o el req.query:
server.use(express.urlencoded({extended:true}));

//Configuracion para que los formularios acepten put, delete, y patch
server.use(method('m'));

//Configuracion de Session. Agrega al request la propiedad session,
//req.session
server.use(session ({
    secret: 'vinyl',
    resave: false,
    saveUninitialized: false,
}));

//Configuracion de cookie. Agrega la propiedad cookies al request
//(req.cookies) y el metodo cookie() al response (res.cookie())
server.use(cookie());
server.use(require('./middlewares/user'));





server.use(require('./routes/products.routes'));
server.use(require('./routes/users.routes'));