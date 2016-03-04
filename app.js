var express = require('express');
var path = require('path');
var request = require('request');

var handlebars = require('express-handlebars');

var app = express();
var http = require('http')
var server = http.Server(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT || 3333)

var localport = '3333';
var localhost = 'http://localhost';

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', handlebars({ extname: 'hbs', defaultLayout: 'layout.hbs' }));
app.set('view engine', 'hbs')


app.host = app.set('host', process.env.HOST || localhost);
app.port = app.set('port', process.env.PORT || localport);

app.get('/', function(req, res) {
	res.render('index', { data: 'test data' });
});

io.on('connection', function(socket) {
  console.log('User Connected!');

  socket.on('loaded', function() {
    var url = 'http://api.giphy.com/v1/gifs/search?q=jaguars&api_key=dc6zaTOxFJmzC'

    getGifs(url, function(data) {
      socket.emit('load', data)
    })
  })

})



function getGifs(url, callback) {
  var options = {
    url: url,
    method : 'GET'
  };
  var res = ''

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
          res = JSON.parse(body);
      }
      else {
          res = 'Not Found';
      }
      callback(res);
  })
  }


module.exports = app;
