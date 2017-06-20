console.log('loaded');
document.getElementById('ok').style.display = 'none';

const socket = io('/');
socket.on('connect', function () {
    console.log('Mobile is connected!');
    socket.emit('client_info', {type: 'mobile'});
});

socket.on('edit_video', ()=>{
    document.getElementById('title').innerHTML = 'Editing video...';
    document.getElementById('ok').style.display = 'block';
});

function done(){
    document.getElementById('title').innerHTML = 'Mobile app';
    document.getElementById('ok').style.display = 'none';
}