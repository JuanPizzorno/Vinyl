const {all, one, generate, write} = require('../models/products.model');
const {unlinkSync} = require('fs');
const {resolve} = require('path');


const controller = {

    index: (req, res) => {

        /* Traemos todos los productos a través del método "all" del modelo, con la posibilidad de 
           filtrar por categoría. La función devuelve la vista "list". */

        let products = all()

        if (req.params.categoria){
            products = products.filter(e => e.genre == req.params.categoria);
            return res.render('list', {products});
        }
        return res.render('list', {products});

    },

    show: (req, res) => {

        /* Para mostrar el detalle de un solo producto utilizamos el método "one" del modelo. 
           La función localiza el producto deseado a través del sku(ID), y devuelve la vista "detail"
           del producto en cuestión. */

        let product = one(req.params.producto);
        if(product){
            return res.render('detail', {product});
        }
        return res.render('detail', {product:null});
    },

    create: (req, res) => {
        /* Este método nos lleva a la vista del formulario de creación de producto. */
        return res.render('create');
    },

    save: (req, res) => {

        /* Este método asgina la imagen cargada por el usuario como imagen del producto.
           En caso de que el usuario no cargue ninguna imagen, se le asignará por defecto el archivo 
           "default.png" */ 

        if(req.files && req.files.length > 0){
            req.body.image = req.files[0].filename;  
        } else {
            req.body.image = 'default.png';
        }

        /* A continuación, utilizamos los métodos "generate" y "write" para añadir el producto al JSON.
           El JSON original se sobreescribe con la información actualizada y se redirige 
           al usuario a la vista principal. */

        let nuevo = generate(req.body);
        let todos = all();
        todos.push(nuevo);
        write(todos);
        return res.redirect('/productos');
    },

    edit: (req, res) => {

        /* Este método nos lleva a la vista del formulario de edición de producto. */
        
        let product = one(req.params.producto);
        return res.render('edit', {product})
    },

    update: (req, res) => {

        /* Este método nos permite modificar datos de un producto ya creado. 
           Reemplazando la información original por la proveniente del req.body.
           Finalmente el usuario es redirigido a la vista principal.
            */ 
      
        let todos = all();
        let actualizados = todos.map(elemento => {
            if(elemento.sku == req.body.sku){
                elemento.name = req.body.name;
                elemento.artist = req.body.artist;
                elemento.year = parseInt(req.body.year);
                elemento.price = parseInt(req.body.price);
                elemento.genre = req.body.genre;
                elemento.image = req.files && req.files.length > 0 ? req.files[0].filename : elemento.image;
            }
            return elemento;
        });
        write(actualizados);
        return res.redirect('/productos');
    },

    remove: (req, res) => {

        /* Para eliminar un producto de la lista, lo localizamos a través del método "one".
           Utilizamos el método "unlinkSync" para remover la imagen del producto.
        */

        let product = one(req.body.sku);
        if(product.image != 'default.png'){
            let file = resolve(__dirname, '..', '..', 'public', 'products', product.image);
            unlinkSync(file);
        }

        /* Finalmente traemos la lista completa de productos a través del método "all".
           Filtramos el producto que deseamos eliminar y sobreescribimos el JSON.
           El usuario es redirigido a la vista principal */

        let todos = all();
        let noEliminados = todos.filter(elemento => elemento.sku != req.body.sku);
        write(noEliminados);
        return res.redirect('/productos');
    }
    
}

module.exports = controller