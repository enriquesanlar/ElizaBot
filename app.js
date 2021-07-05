const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const { Server } = require('socket.io');
const ElizaBot = require('elizabot');
const io = new Server(server);
const eliza = new ElizaBot(false);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Usuario conectado: ' + socket.id);
    socket.emit('chat message', {
        author: "Eliza",
        message: eliza.getInitial()
    });
    socket.on('chat message', (msg) => {
        socket.emit('chat message', {
            author: "Eliza",
            message: eliza.transform(msg.message)
        });
    });
    socket.on('disconnect', () => {
        console.log('Usuario desconectado: ' + socket.id);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

