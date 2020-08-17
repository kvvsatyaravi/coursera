const express = require('express'),
     http = require('http');
const hostname = 'localhost';
const port = 3000;
const app = express();

const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { 
  console.log(err); 
});

const dishRouter = require('./routes/dishrouter');
const leaderRouter = require('./routes/leaderrouter');
const leaderIdRouter = require('./routes/leaderrouter');
const promoRouter = require('./routes/promorouter');
const promoIdRouter = require('./routes/promorouter');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));app.use('/dishes', dishRouter);
app.use('/dishes/:dishId',dishRouter);
app.use(express.static(__dirname + '/public'));app.use('/promotions', promoRouter);
app.use('/promotions/:promoId',promoIdRouter);
app.use(express.static(__dirname + '/public'));app.use('/leader', leaderRouter);
app.use('/leaders/:leadId',leaderIdRouter);

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
