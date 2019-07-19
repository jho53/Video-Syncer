$(function () {
    var socket = io();
    var container = document.getElementById('messages');

    $('form').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('chat message', $('#chatinput').val());
        $('#chatinput').val('');
    });

    socket.on('chat message', function (msg) {
        $('#messages').append($('<li>').text(msg));
        container.scrollTop = container.scrollHeight;
    });
});