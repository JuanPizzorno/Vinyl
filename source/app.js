const express = require('express');
const {join} = require('path');
const server = express()
const {port,start} = require('./modules/server')

server.listen(port, start());

server.set ('views', join(__dirname, './views'));
server.set ('view engine', 'ejs')


const statics = require('./modules/static');
server.use(statics(join(__dirname, '../public')));
server.use(express.urlencoded({extended:true}));
server.use(require('./routes/products.routes'));