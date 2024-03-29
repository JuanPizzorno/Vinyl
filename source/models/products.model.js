const {resolve} = require('path');
const fs = require('fs');

let model = {

        all: function(){
            let file = resolve(__dirname, '../data', 'products.json');
            let data = fs.readFileSync(file);
            return JSON.parse(data);
        },

        one: function(sku){
            let all = model.all();
            return all.find (e => e.sku == sku);
        },

        generate: function (data){
            let all = model.all();
            let last = all.pop()
            let product = {};

            product.name = data.name;
            product.artist = data.artist;
            product.year = parseInt(data.year);
            product.price = parseInt(data.price);
            product.genre = data.genre;
            product.sku = last.sku + 1;
            product.image = data.image;
            return product;
        },

        write: function(data){
            let file = resolve(__dirname, '../data', 'products.json');
            let json = JSON.stringify(data, null, 2);
            return fs.writeFileSync(file, json)
        }
}

module.exports = model