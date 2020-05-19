var low= require('lowdb');
var FileSync = require('lowdb/adapters/FileAsync');
var db;

async function createConnection() {
    var adapter = new FileSync('db.json')
    db = await low(adapter);
    db.defaults({ users: [] }).write();
}
createConnection();

var md5 = require('md5');
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
    var hashedPassword = md5(password);
    if(user.password !== hashedPassword) {
        res.render('auth/login', {
            errors: [
                'wrong password'
            ]
        });
        return;
    }
    res.cookie('userId', user.id, {
        signed: true
    });
    res.redirect('/users');
};