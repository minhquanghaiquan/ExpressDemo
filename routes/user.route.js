var express = require('express');
var multer = require('multer');
var router = express.Router();
var validate = require('../validate/user.validate');

var upload = multer({dest: './public/uploads'});
var controller=require('../controllers/user.controller');
var authMiddleware= require('../middlewares/auth.middleware');

// /* file db */
// var low= require('lowdb');
// var FileSync = require('lowdb/adapters/FileAsync');
// var db;

// async function createConnection() {
//     var adapter = new FileSync('db.json')
//     db = await low(adapter);
//     db.defaults({ users: [] }).write();
// }
// createConnection();



router.get('/',controller.index);
router.get('/cookie', function(req,res,next){
    res.cookie('user-id', 12345);
    res.send('Hello');
})


router.get('/search', controller.search);

router.get('/create' , controller.create);

router.get('/:id', controller.get);

router.post('/create',
    upload.single('avatar'),
    validate.postCreate, 
    controller.postCreate);

module.exports = router;