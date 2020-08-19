const express = require('express'),
     http = require('http');
const hostname = 'localhost';
const port = 3000;
const app = express();

const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { 
  console.log(err); 
});

const dishRouter = require('./routes/dishrouter');
const leaderRouter = require('./routes/leaderrouter');
const promotionRouter = require('./routes/promorouter');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const morgan = require('morgan');
app.use(morgan('dev'));
function auth (req, res, next) {
  console.log(req.headers);
  var authHeader = req.headers.authorization;
  if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
      return;
  }

  var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];
  if (user == 'admin' && pass == 'password') {
      next(); // authorized
  } else {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');      
      err.status = 401;
      next(err);
  }
}

app.use(auth);
app.use(express.static(__dirname + '/public'));app.use('/dishes', dishRouter);
app.use('/dishes/:dishId',dishRouter);
app.use(express.static(__dirname + '/public'));app.use('/promotions', promotionRouter);
app.use('/promotions/:promoId',promotionRouter);
  app.use(express.static(__dirname + '/public'));app.use('/leaders', leaderRouter);
app.use('/leaders/:leadId',leaderRouter);


const server = http.createServer(app);



server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
