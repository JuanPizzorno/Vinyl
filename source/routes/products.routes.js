const {Router} = require('express');
const route = Router();
const {index, show, create, save, edit, update, remove} = require('../controllers/products.controller');
const {resolve, extname} = require('path'); 
const {existsSync, mkdirSync} = require('fs');

const destination = function(req, file, cb){
    let folder = resolve(__dirname, '..', '..', 'public', 'products');
    if(!existsSync(folder)){
        mkdirSync(folder);
    }
    return cb(null, folder);
}

const filename = function(req, file, cb){
    let name = file.fieldname + '-' + Date.now() + extname(file.originalname);

    return cb(null, name);
}

const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({destination, filename})
    });


route.get('/productos/nuevo', create);

route.post('/productos/guardar', upload.any(), save);

route.get('/productos/detalle/:producto', show);

route.get('/productos/editar/:producto', edit);

route.put('/productos/actualizar', upload.any(), update);

route.get('/productos/:categoria?', index);

route.delete('/productos/borrar', remove);

module.exports = route