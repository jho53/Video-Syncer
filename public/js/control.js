var slider = document.getElementById("vSlider");
var output = document.getElementById("vTime");

var timeValue;

output.innerHTML = 0; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    output.innerHTML = this.value;
}

/**
 * Youtube API
 */

// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;

function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
        height: '100%',
        width: '100%',
        videoId: 'B9mEIZ3qMTw',
        playerVars: {
            'autoplay': 1,
            'showInfo': 0,
            'controls': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

// Autoplay
function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    console.log(event.target.getCurrentTime());
}

function onPlayerError(event) {
    //add later
    return null;
}

/**
 * Slider + Button Control
 */

var playstate = true;
var socket = io();

//Buttons
var playButton = $('#play-btn');
var pauseButton = $('#pause-btn');
var ffButton = $('#ff-btn');

playButton.click(() => {
    player.playVideo();
    playstate = true;
    socket.emit('playerEvent', 'play');
});
pauseButton.click(() => {
    player.pauseVideo();
    playstate = false;
    socket.emit('playerEvent', 'pause');
});
ffButton.click(() => {
    player.stopVideo();
    playstate = false;
    socket.emit('playerEvent', 'ff');
});