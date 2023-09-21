const {resolve} = require('path');
const fs = require('fs');
const { hashSync } = require("bcrypt");

let model = {
    index: function(){
        let file = resolve(__dirname, '../data', 'users.json');
        let data = fs.readFileSync(file)
        return JSON.parse(data);
    },

    one: function (data) {
        model.index().find((e) => e.data == data);
      },

      generate: function (data) {
        let all = model.index();
        let last = all.pop()
        let user = {};
        
        user.nombre = data.nombre;
        user.apellido = data.apellido;
        user.email = data.email;
        user.password = data.password
        user.sku = last.sku + 1;
        user.imagenUsuario = data.imagenUsuario;

        return user;

      },

    write: function (data) {
        let file = resolve(__dirname, '../data', 'users.json');
        let json = JSON.stringify(data, null, 2);
        return fs.writeFileSync(file, json);
      },
};

module.exports = model;
    
