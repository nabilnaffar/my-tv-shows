'use strict';

var notification = document.getElementById('notification');
var shareBar = document.getElementById('share-modal');
var editor = document.getElementById('editor');
var video = document.getElementById('video');
var sliderFrom = document.getElementById('slider-from');
var sliderTo = document.getElementById('slider-to');
var originalSrc = '/videos/trimmed20.mp4';

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

    socket.on('edit_video', function(data){
        setFilename(data.name)
        showNotification();
    });    
}

function setFilename(name){
    if(video.children && video.children.length){
        video.removeChild(video.children[0]);
    }

    originalSrc = '/videos/'+name+'.mp4';  
    var source = document.createElement('source');
    source.setAttribute('src', originalSrc);
    source.setAttribute('type','video/mp4');
    video.appendChild(source);
    video.play();
}

// function hideBackground(){
//     document.getElementById('bg').style.display = 'none';
// }

function shareToFB(){
    loginToFB();
}

function showNotification(){
    notification.className="notification-android";
}

function hideNotification(){
    notification.className="notification-android-hidden";
}

function displayShareModal(){
    shareBar.style.display = 'flex';
}

function displayEditor(){
    hideNotification();
    //hideBackground();
    editor.style.display='block';
    // hideBackground();

    // setupSlider();
    // onSliderChange();
}

// function setupSlider(){
    
// }

// function onSliderChange(){
//     var src = originalSrc + '#t=' + sliderFrom.value +',' + sliderTo.value;
//     video.removeAttribute('source');
//     var source = document.createElement('source');
//     source.setAttribute('src', src);
//     source.setAttribute('type','video/mp4');
//     video.appendChild(source);
//     video.play();
// }


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