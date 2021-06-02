'use strict';

const Message = require('./src/data/message');
const express = require('express');
const config = require('./config');
const cors = require('cors');

const app = express();
var io = null;
var server = null;

const Routes = require('./src/routes');

const initialServer = () => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/public", express.static("public"));
    
    app.use('/', Routes.routes);
    
    
    //Socket.io

    server = require('http').createServer(app);
    io = require('socket.io')(server, {
        cors: {
          origin: '*',
        }
    });
}

initialServer();

// set up socket.io

io.on('connection', function (socket) {
    console.log('Welcome to server chat');

    socket.on('join', (conversation_id) => {
        console.log('====================================');
        console.log("join with conversation: ", conversation_id);
        console.log('====================================');
        socket.join(`room-${conversation_id}`);
        socket.on('typing', () => {
            socket.to(`room-${conversation_id}`).emit('typing');
        })
        socket.on('stop-typing', () => {
            socket.to(`room-${conversation_id}`).emit('stop-typing');
        })
        socket.on('sent', async (data) => {
            const rs = await Message.saveMessage(data);
            if(rs && rs[0].message_id){
                socket.to(`room-${conversation_id}`).emit('recieved', {...data});
                io.to(`${socket.id}`).emit('sent');
            }else{
                io.to(`${socket.id}`).emit('sent-err');
            }
        })
        socket.on('leave', (conversation_id) => {
            socket.leave(`room-${conversation_id}`)
        })
    });
});

server.listen(config.port, () => {
    console.log('Server is running on http://localhost:' + config.port);
});