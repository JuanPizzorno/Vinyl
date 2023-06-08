const {all, one, generate, write} = require('../models/products.model');


const controller = {

    index: (req, res) => {

        let products = all()

        if (req.params.categoria){
            products = products.filter(e => e.genre == req.params.categoria);
            return res.render('list', {products});
        }

        return res.render('list', {products});

    },

    show: (req, res) => {
        let product = one(req.params.producto);
        if(product){
            return res.render('detail', {product});
        }
        
        return res.render('detail', {product:null});
    },

    create: (req, res) => {
        return res.render('create');
    },

    save: (req, res) => {
        let nuevo = generate(req.body)
        let todos = all();
        todos.push(nuevo);
        write(todos);
        return res.redirect('/productos');
    }
}

module.exports = controller