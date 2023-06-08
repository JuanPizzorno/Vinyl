const {Router} = require('express');
const route = Router();
const {index, show, create, save} = require('../controllers/products.controller');

route.get('/productos/nuevo', create);
route.post('/productos/guardar', save);
route.get('/productos/detalle/:producto', show);
route.get('/productos/:categoria?', index);



module.exports = route