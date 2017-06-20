const http = require('http');
const express = require('express');
const io = require('socket.io');
const path = require('path');
const fs = require('fs');


var FfmpegCommand = require('fluent-ffmpeg');



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

    client.on('send_for_editing', (data) => {
        if(clients.mobile){
            console.log('send_for_editing called with: ', data.to);
            let video = trim(Math.max(0, (data.to - 20)), data.to, 'trimmed20', err => { //last 20 secs
                if(err){
                    console.log(err);
                    return;
                }
                console.log('done!');
                clients.mobile.emit('edit_video');
            });
            
        }
    });

    client.on('publish', data => {
        let video = trim(data.from, data.to, 'trimmed10', err => {
                if(err){
                    console.log(err);
                    return;
                }
                //publish trimmed10 here!
            });
            
    });
});

function trim(from, to,filename, cb){
    var command = new FfmpegCommand('public/videos/game01.mp4');
    command.setStartTime('00:00:03')
        .setDuration('10')
        .output('public/videos/'+filename+'.mp4')
        .on('end', function(err) {   
            if(!err)
            {
            console.log('conversion Done');
            cb();
            }                 
        })
        .on('error', function(err){
            console.log('error: ', +err);
            cb(err);
        }).run();
}