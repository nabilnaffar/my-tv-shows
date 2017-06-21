const http = require('http');
const express = require('express');
const io = require('socket.io');
const path = require('path');
const fs = require('fs');
// const fbUpload = require('facebook-api-video-upload');
// const FB = require('fb');
const moment = require('moment');

var port = process.env.PORT || 3000;

const yourtoken = 'f569c677ec0bbab82d5ae00be93499f5';
const yourid = '110420452907305';
const yoursecret = '3a4a76b943435f98d3a740f5479b110b';

var FfmpegCommand = require('fluent-ffmpeg');


const app = express()
const server = http.createServer(app);
const socket = io(server);

let clients = {tv: undefined, mobile: undefined};

app.use(express.static('public'));
app.get('/socket-client', (req, res) => {res.sendFile(path.resolve(__dirname, 'node_modules/socket.io-client/dist/socket.io.js'))});


server.listen(port, function () {
    console.log('Example app listening on port '+port)
});


socket.on('connection', (client) => {
    console.log(`connected to ${client.id}`);
    
    client.on('client_info', (data) => {
        console.log('identified as: ', data.type);
        clients[data.type] = client;
    });

    client.on('send_for_editing', (data) => {
        console.log('send_for_editing, check available clients');
        if(clients.mobile){
            console.log('send_for_editing called with: ', data.to);
            console.log('cut to ----> ' , data.to);
            let fileName = 'trimmed20-' + hashCode();
            let video = trim('public/videos/game01.mp4', Math.max(0, (data.to - 20)), 20, fileName, err => { //last 20 secs
                if(err){
                    console.log(err);
                    return;
                }
                console.log('file generated : ', fileName);
                clients.mobile.emit('edit_video', {name: fileName});
            });
        
            
        }
    });

    client.on('publish', data => {
        console.log('----> ' , typeof data.from);
        let video = trim('public/videos/'+data.name+'.mp4', Math.max(0, data.from), Math.max(0, data.to - data.from) , 'sharable', err => {
                if(err){
                    console.log(err);
                    return;
                }
                //publish trimmed10 here!
                // const args = {
                //     token: yourtoken, // with the permission to upload 
                //     id: yourid, //The id represent {page_id || user_id || event_id || group_id} 
                //     stream: fs.createReadStream(path.resolve(__dirname, 'public/videos/sharable.mp4')) //path to the video 
                // };
                // fbUpload(args).then((res) => {
                //     console.log('res: ', res);
                //     //res:  { success: true, video_id: '1838312909759132' } 
                // }).catch((e) => {
                //     console.error(e);
                // });
            });
            
    });
});

function trim(source, from, to,filename, cb){
    //'public/videos/game01.mp4'
    var command = new FfmpegCommand(source);
    command.setStartTime(getTime(from))
        .setDuration(to)
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

function hashCode(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getTime(sec){
    let text =  moment("2015-01-01").startOf('day')
    .seconds(sec)
    .format('H:mm:ss');
    console.log(text);
    return text;
}