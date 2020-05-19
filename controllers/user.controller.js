var low= require('lowdb');
var FileSync = require('lowdb/adapters/FileAsync');
var db;

async function createConnection() {
    var adapter = new FileSync('db.json')
    db = await low(adapter);
    db.defaults({ users: [] }).write();
}
createConnection();

var shortid = require('shortid');

module.exports.index = function(request, response){
    response.render('users/index' , {
        users: db.get('users').value()
    });
};

module.exports.search = function(req , res) {
    var q = req.query.q;
    var matchedUsers= db.get('users').value().filter(function(user) {
        return user.name.indexOf(q) !==-1;
    })
    res.render('users/index', {
        users: matchedUsers
    });
};

module.exports.create = function(req , res) {
    console.log(req.cookies);
    res.render('users/create')
};

module.exports.get = function(req , res){
    var id= req.params.id;
    var user = db.get('users').find({id: id}).value();

    res.render('users/view', {
        user: user
    });
};

module.exports.postCreate = function(req, res){
    req.body.id= shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
};