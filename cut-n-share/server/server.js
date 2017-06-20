const http = require('http');
const express = require('express');
const io = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express()
const server = http.createServer(app);
const socket = io(server);

let clients = {tv: undefined, mobile: undefined};

app.use(express.static('public'));
app.get('/socket-client', (req, res) => {res.sendFile(path.resolve(__dirname, 'node_modules/socket.io-client/dist/socket.io.js'))});

server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});


socket.on('connection', (client) => {
    console.log(`connected to ${client.id}`);
    
    client.on('client_info', (data) => {
        console.log('identified as: ', data.type);
        clients[data.type] = client;
    });

    client.on('send_for_editing', (client) => {
        if(clients.mobile){
            console.log('send_for_editing called');
            clients.mobile.emit('edit_video');
        }
    });
});