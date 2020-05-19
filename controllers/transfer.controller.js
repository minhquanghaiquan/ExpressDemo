var low= require('lowdb');
var FileSync = require('lowdb/adapters/FileAsync');
var db;

async function createConnection() {
    var adapter = new FileSync('db.json')
    db = await low(adapter);
    db.defaults({ 
        users: [] ,
        sessions: [],
        transfers: []
     }).write();
}
createConnection();
var shortid = require('shortid');

module.exports.create = function(req , res , next) {
    res.render('transfer/create', {
        csrfToken: req.csrfToken()
    });
};

module.exports.postCreate= function(req , res , next) {
    var data = {
        id: shortid.generate(),
        amount: parseInt(req.body.amount),
        accountId: req.body.accountId,
        userId : req.signedCookies.userId
    };
    db.get('transfers').push(data).write();
    res.redirect('/transfer/create');
};