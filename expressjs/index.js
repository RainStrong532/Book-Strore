'use strict';

const express = require('express');
const config = require('./config');
const cors = require('cors');

const app = express();

app.use(cors(config.domainFrontEnd));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

const Routes = require('./src/routes');

app.use('/', Routes.routes);


//Socket.io

var path = require("path");
var server = require('http').createServer(app);
var io = require('socket.io')(server);

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