const {index, one, generate, write} = require('../models/users.model');
const {validationResult} = require('express-validator');
const { hashSync } = require("bcrypt");
const { resolve } = require("path");
const { unlinkSync } = require("fs");



module.exports = {

    // Renderizamos la vista de login. 
    login: (req, res) => res.render('login'),

    // Renderizamos la vista de registro.
    register: (req, res) => res.render('register'),

    // Renderizamos la vista de "Mi Perfil" (En desarrollo).
    profile: (req, res) => res.render(''),

    // Permitimos al usuario crear su cuenta.
    save: (req, res) => {

        // Utilizamos Express-Validator para corrobar que los datos ingresados por el usuario sean válidos.
         const result = validationResult(req);
            if (!result.isEmpty()) {
                let errors = result.mapped();

        // En caso de haber errores, mostramos nuevamente el formulario de registro detallando los errores.
            return res.render("register", { errors, data: req.body });
        } 

        // En caso de no haber errores continuamos con el registro. Primero, trayendo la lista de usuarios
        // A través del método "index". 
        let all = index();

        // Asignamos al usuario la imagen que haya cargado y un sku(ID) único.
        req.body.imagenUsuario = req.files && req.files [0] ? req.files[0].filename : null;
        req.body.sku = all.length > 0 ? all.pop().sku + 1 : 1;

        // Pusheamos el nuevo usuario en el Array y sobreescribimos el JSON original con la info actualizada.
        let user = { ...req.body };
        all.push(user);
        write(all);

        // Una vez completado el registro, el usuario es redirigido a la vista de login.
        return res.redirect('/login');
    },

    // Permitimos al usuario acceder
    access: (req, res) => {
        // IMPORTANTE: (FUNCIÓN EN DESARROLLO)

        // Validamos la información 
        const result = validationResult(req);
        if (!result.isEmpty()) {
            let errors = result.mapped();

        // En caso de haber errores, vuelve a la vista de login detallando los errores.
        return res.render("login", { errors, data: req.body })
    };

        // Generamos una cookie con un tiempo máximo y permitimos el inicio de sesión
        res.cookie('user', req.body.email, {maxAge:1000 * 60 * 60});
        let todos = index();
        req.session.user = todos.find((user) => user.email == req.body.email);

        // Redirigimos al usuario al home.
        return res.redirect('/productos')
    },
};



