const createApp = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv').config({path: './.env'});

const app = createApp();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*"}
    });

require('./socket/socket')(io);

server.listen(3000, () => {
    console.log('Chat server listening on port 3000');
});


