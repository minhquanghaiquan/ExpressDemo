var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var app = express();
var port = 3000;

var authMiddleware= require('./middlewares/auth.middleware')





app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var path = require ('path');
app.set('view engine','pug');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser('dfghhhh2h232ffd'));
app.use(express.static(__dirname + '/public'));
// users = [
//     {name: 'Quang'},
//     {name: 'Thinh'},
//     {name: 'Tam'},
//     {name: 'Thinh'}
// ]

app.get('/', function(request, response){
    response.render('index');
});

// app.get('/users', function(request, response){
//     response.render('users/index' , {
//         users: db.get('users').value()
//     });
// });

// app.get('/users/search', function(req , res) {
//     var q = req.query.q;
//     var matchedUsers= db.get('users').value().filter(function(user) {
//         return user.name.indexOf(q) !==-1;
//     })
//     res.render('users/index', {
//         users: matchedUsers
//     });
// });

// app.get('/users/create' , function(req , res) {
//     res.render('users/create')
// });

// app.get('/users/:id', function(req , res){
//     var id= req.params.id;
//     var user = db.get('users').find({id: id}).value();

//     res.render('users/view', {
//         user: user
//     });
// });

// app.post('/users/create', function(req, res){
//     req.body.id= shortid.generate();
//     db.get('users').push(req.body).write();
//     res.redirect('/users');
// })
app.use('/users',authMiddleware.requireAuth ,userRoute);
app.use('/auth', authRoute);

app.listen(port, function(){
});
