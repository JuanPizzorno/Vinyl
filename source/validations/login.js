const {body} = require('express-validator');
const {index} = require('../models/users.model');

let email = body('userName')
  .notEmpty()
  .withMessage("El campo no puede estar vacío")
  .bail()
  .isEmail()
  .withMessage("Formato no válido")
  .bail()
  .custom((value, {req}) => {
    let users = index();
    let listOfEmails = users.map(user => user.email)
    if(listOfEmails.indexOf(value) == -1){
        throw new Error('Usuario no encontrado')
    }
    return true
  })

  let password = body('password')
  .notEmpty()
  .withMessage("El campo no puede estar vacío")
  .bail()
  .isLength({ min: 8 })
  .custom((value, {req}) => {
    let users = index();
    let result = users.find(user => user.password == req.body.password)
    if(!result){
        throw new Error('La contraseña es invalida');
    }

    if(result.password != value){
        throw new Error('La contraseña es invalida');
    }

    return true

  })

  let validaciones = [email, password]

  module.exports = validaciones