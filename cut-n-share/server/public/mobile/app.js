console.log('loaded');

const socket = io('/');
socket.on('connect', function () {
    console.log('Mobile is connected!');
});