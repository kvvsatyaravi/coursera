const express = require('express'),
     http = require('http');
const hostname = 'localhost';
const port = 3000;
const app = express();
const dishRouter = require('./routes/dishrouter');
const dishIdRouter = require('./routes/dishrouter')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));app.use('/dishes', dishRouter);
app.use('/dishes/:dishId',dishIdRouter);

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});