const http = require('http');
const app = require('./app')

const port = 1337;
const server = http.createServer(app);

server.listen(port);

