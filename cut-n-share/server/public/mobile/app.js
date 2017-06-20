function init(){
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
    document.getElementById('ok').style.display = 'none';
}



window.fbAsyncInit = function() {
    console.log('!!!');
    FB.init({
      appId            : '1973039616261193',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.9'
    });
    FB.AppEvents.logPageView();
  };