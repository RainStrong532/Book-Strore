'use strict';

const express = require('express');
const config = require('./config');
const cors = require('cors');

const app = express();
var io = null;
var server = null;


const Routes = require('./src/routes');

const initialServer = () => {
    app.use(cors(config.domainFrontEnd));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/public", express.static("public"));
    
    app.use('/', Routes.routes);
    
    
    //Socket.io

    server = require('http').createServer(app);
    io = require('socket.io')(server);
}

initialServer();

app.get("/chat", function (req, res) {
    res.sendFile(path.join(__dirname + '/public/chat.html'));
});

io.on('connection', function (socket) {
    console.log('Welcome to server chat');

    socket.on('send', function (data) {
        io.sockets.emit('send', data);
    });
});

server.listen(config.port, () => {
    console.log('Server is running on http://localhost:' + config.port);
});