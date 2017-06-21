console.log('loaded');

const socket = io('/');
let video = document.getElementById('video');
socket.on('connect', function () {
    console.log('Player is connected!');
    socket.emit('client_info', {type: 'tv'});
});


function sendToEdit(){
    console.log('share scene!');
    socket.emit('send_for_editing', {to: video.currentTime});
}