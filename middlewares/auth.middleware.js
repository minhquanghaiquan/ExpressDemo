var low= require('lowdb');
var FileSync = require('lowdb/adapters/FileAsync');
var db;

async function createConnection() {
    var adapter = new FileSync('db.json')
    db = await low(adapter);
    db.defaults({ users: [] }).write();
}
createConnection();

module.exports.requireAuth = function (req, res , next){
    if (!req.cookies.userId) {
        res.redirect('/auth/login');
        return;
    }

    var user = db.get('users').find({ id: req.cookies.userId}).value();
    if (!user) {
        res.redirect('/auth/login');
        return;
    }
    next();
};