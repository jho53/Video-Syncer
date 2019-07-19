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
          events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
          }
      });
  }

  // Autoplay
  function onPlayerReady(event) {
      event.target.playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;

  function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 60);
          done = true;
      }
  }

  function stopVideo() {
      player.stopVideo();
  }