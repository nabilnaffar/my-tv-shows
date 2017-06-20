console.log('loaded');

const socket = io('/');
socket.on('connect', function () {
    console.log('Player is connected!');
    socket.emit('client_info', {type: 'tv'});
});


function sendToEdit(){
    socket.emit('send_for_editing');
}