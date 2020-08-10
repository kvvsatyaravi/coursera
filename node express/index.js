const express = require('express'),
     http = require('http');

const hostname = 'localhost';
const port = 3000;

const app = express();
const morgan = require('morgan');

const dishRouter = require('./routes/dishRouter');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use('/dishes', dishRouter);



const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});