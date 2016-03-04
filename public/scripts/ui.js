var readyFunction = function() {
  var socket = io();

  socket.emit('loaded')

  socket.on('load', function(data) {
    var gifs = data.data
    console.log(data.data[1].images.original.url)

    for (var i = 0; i < gifs.length; i++) {
      var gif = data.data[i].images.original.url
      var gifHTML = '<img src="' + gif + '" />'
      $('body').append(gifHTML)
    }
  })
}

if (document.readyState != 'loading') {
	readyFunction();
}
else {
	document.addEventListener('DOMContentLoaded', readyFunction())
}
