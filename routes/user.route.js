var express = require('express');
var router = express.Router();

var controller=require('../controllers/user.controller');
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



router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create' , controller.create);

router.get('/:id', controller.get);

router.post('/create', controller.postCreate);

module.exports = router;