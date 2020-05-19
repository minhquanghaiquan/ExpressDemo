var express = require('express');
var router = express.Router();
var validate = require('../validate/user.validate');

var controller=require('../controllers/auth.controller');

router.get('/login', controller.login);
router.post('/login', controller.postLogin);
module.exports= router;