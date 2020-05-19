var low= require('lowdb');
var FileSync = require('lowdb/adapters/FileAsync');
var db;

async function createConnection() {
    var adapter = new FileSync('db.json')
    db = await low(adapter);
    db.defaults({ users: [] }).write();
}
createConnection();

module.exports.login = function(req , res) {
    res.render('auth/login');
};

module.exports.postLogin = function(req , res) {
    var email = req.body.email;
    var password = req.body.password;

    var user = db.get('users').find({email: email}).value();

    if(!user) {
        res.render('auth/login', {
            errors: [
                'User does not exist.'
            ]
        });
        return;
    }
    if(user.password !== password) {
        res.render('auth/login', {
            errors: [
                'wrong password'
            ]
        });
        return;
    }
    res.cookie('userId', user.id);
    res.redirect('/users');
};