let notification = document.getElementById('notification');
let shareBar = document.getElementById('share-modal');
let editor = document.getElementById('editor');


editor.style.display = 'none';
shareBar.style.display = 'none';

hideNotification();

function init(){
    console.log('loaded');

    const socket = io('/');
    socket.on('connect', function () {
        console.log('Mobile is connected!');
        socket.emit('client_info', {type: 'mobile'});
    });

    socket.on('edit_video', ()=>{
        showNotification();
    });

    
}

function shareToFB(){
    loginToFB();
}

function showNotification(){
    notification.style.display='flex';
}

function hideNotification(){
    notification.style.display='none';
}

function displayShareModal(){
    shareBar.style.display = 'flex';
}

function displayEditor(){
    hideNotification();
    editor.style.display='block';
}


function loginToFB() {
    FB.login(function (response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function (response) {
                console.log('Good to see you, ' + response.name + '.');
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
            scope: 'publish_actions',
            return_scopes: true
    });
}

function postVideo(){

}



function done(){
    document.getElementById('title').innerHTML = 'Mobile app';
}



window.fbAsyncInit = function() {
    FB.init({
      appId            : '1973039616261193',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.9'
    });
    FB.AppEvents.logPageView();
  };