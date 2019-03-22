const express = require('express');
const helmet = require('helmet')

const projectsRouter = require('./data/projects/projects-router.js');
const actionsRouter = require('./data/actions/actions-router.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

module.exports = server;