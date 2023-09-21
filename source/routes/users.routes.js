const {Router} = require('express');
const router = Router();
const {resolve, extname} = require('path'); 
const {existsSync, mkdirSync} = require('fs');
const validador = require('../validations/register');
const validadorLogin = require('../validations/login');

const {login, register, profile, save, access} = require('../controllers/users.controller');

const destination = function (req, file, cb) {
    let folder = resolve(__dirname, "..", "..", "public", "images", "users");
    if (!existsSync(folder)) {
      mkdirSync(folder);
    }
    return cb(null, folder);
  };

const filename = function (req, file, cb) {
    let unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let name = file.fieldname + "-" + unique + extname(file.originalname);
    return cb(null, name);
};


const multer = require("multer");
const { diskStorage } = require("multer");

const upload = multer({
  storage: diskStorage({ destination, filename }),
});



router.get('/login', login);
router.get('/profile', profile);
router.get('/register', register);
router.post('/save', upload.any(), validador, save);
router.post('/access', validadorLogin, access)

module.exports = router;