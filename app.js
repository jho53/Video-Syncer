const socket = require('socket.io');
const express = require('express');
const app = express();
const path = require('path')

const port = process.env.PORT || 8080;

var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(port, () => {
    console.log(`Listening on: ${port}`);
});

app.use(express.static(path.join(__dirname, '/public')));
app.use('/', express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//Socket.io Section
var userCount = 0;
io.on('connection', function (socket) {
    userCount++;
    console.log(`An user connected, total users = ${userCount}`);
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
    socket.on('playerEvent', function (msg) {
        console.log(msg);
    })
    socket.on('disconnect', function () {
        userCount--;
        console.log(`An user disconnected, total users = ${userCount}`);
    });
});