var low= require('lowdb');
var FileSync = require('lowdb/adapters/FileAsync');
var db;

async function createConnection() {
    var adapter = new FileSync('db.json')
    db = await low(adapter);
    db.defaults({ users: [] }).write();
}
createConnection();


module.exports = db;