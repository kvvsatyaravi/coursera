const express = require('express'),
     http = require('http');

var fs = require('fs');

var https = require('https');
var privateKey  = fs.readFileSync('bin/private.key', 'utf8');
var certificate = fs.readFileSync('bin/certificate.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('./authenticate');

const dishRouter = require('./routes/dishrouter');
const leaderRouter = require('./routes/leaderrouter');
const promotionRouter = require('./routes/promorouter');
const userRouter = require('./routes/users');
const indexRouter= require('./routes/index');

const bodyParser = require('body-parser');
var config = require('./config');
const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { 
  console.log(err); 
});


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

app.use(bodyParser.json());
const morgan = require('morgan');
app.use(morgan('dev'));

app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', userRouter);

function auth (req, res, next) {
  console.log(req.user);

  if (!req.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    next(err);
  }
  else {
        next();
  }
}

app.use(auth);

app.use(express.static(__dirname + '/public'));
app.use('/dishes', dishRouter);
app.use('/dishes/:dishId',dishRouter);
app.use('/promotions', promotionRouter);
app.use('/promotions/:promoId',promotionRouter);
app.use('/leaders', leaderRouter);
app.use('/leaders/:leadId',leaderRouter);

// Secure traffic only



