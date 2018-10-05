// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const allowCors = require('./cors');


// Import Api routes
const apiRouter = require('../src');

const port = 3000;

const server = express();

// Config middlewares
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(allowCors);

server.use('/api', apiRouter);

server.listen(port, () => console.log(`Server is running on ${port} port.`));


module.exports = server;

