const http = require('http');
const app = require('./app');

//set the PORT
const PORT = process.env.PORT || 5000;

//create server
const server = http.createServer(app);
server.listen(PORT);