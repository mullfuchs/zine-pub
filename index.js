var express  = require('express');
var app = express();   
var mongoose = require('mongoose');


var bodyParser = require('body-parser');
var path = require('path');

var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = 'process.env.JWT_SECRET';

var multer = require('multer');
// app.use('/uploads', express.static(__dirname + &quot;/uploads&quot;));
// app.use(multer({dest: './uploads/'}))

mongoose.connect('mongodb://localhost/zinepub');

var User = require('./models/user');
var Zine = require('./models/zine');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('morgan')('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/zines', require('./controllers/zines'));

app.use('/api/users', expressJWT({secret: secret}).unless({method: 'POST'}), require('./controllers/users'));

// app.post('/api/zines', function(req, res){
//   //console.log('zine post route in index.js');
//   Zine.create(req.body, function(err, zine){
//     console.log('zine post route in index.js');
//   });
// });

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ message: 'You need an authorization token to view this information.' });
  }
});

app.post('/api/auth', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    // return 401 if error or no user
    if (err || !user) return res.status(401).send({ message: 'User not found' });

    // attempt to authenticate a user
    var isAuthenticated = user.authenticated(req.body.password);
    // return 401 if invalid password or error
    if (err || !isAuthenticated) return res.status(401).send({ message: 'User not authenticated' });

    // sign the JWT with the user payload and secret, then return
    var token = jwt.sign(user.toJSON(), secret);

    return res.send({ user: user, token: token });
  });
});

app.listen(3000);