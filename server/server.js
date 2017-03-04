var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server, { log: false }),
    cors = require('cors');

// Port
var runningPortNumber = process.env.PORT || 8080;

// CORS
var whitelist = ['http://127.0.0.1', 'http://localhost','http://127.0.0.1:8080', 'http://localhost:8080'];
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};
app.use(cors(corsOptions));

// Socket IO
io.sockets.on('connection', function (socket) {
  console.log('Connected succesfully to the socket ' + new Date());
  io.sockets.emit('connected', { msg: "someone connected" } );
});

// Server listens on port
server.listen(runningPortNumber, function(){
  console.log('Listening on port ' + this.address().port);
});
