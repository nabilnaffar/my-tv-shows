console.log('loaded');

const socket = io('/');
socket.on('connect', function () {
    console.log('Player is connected!');
});