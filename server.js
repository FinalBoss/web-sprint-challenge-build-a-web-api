const express = require('express');
const helmet = require('helmet');
const projectRouter = require('./projects/projects-router');
const actionRouter = require('./actions/actions-router');

const server = express();

server.use(express.json());
server.use('api/project', projectRouter);
server.use('api/action', actionRouter);
server.get(helmet());
server.use(logger);



function logger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
}



module.exports = server;
