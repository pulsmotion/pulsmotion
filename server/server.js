var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server, { log: false }),
    cors = require('cors');

// Port
var runningPortNumber = process.env.PORT || 8080;

// Body parser
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// CORS
var whitelist = ['http://127.0.0.1', 'http://localhost','http://127.0.0.1:8080', 'http://localhost:8080', 'http://172.17.101.242', 'http://172.17.101.242:8080', 'http://172.17.244.207:8080', 'http://172.17.244.207'];
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

app.post('/moments', function(req, res, next) {
  console.log(req.body);
  console.log('New moment detected ' + new Date());
  io.sockets.emit('new-moment', { msg: "New moment", event: 'new-moment', moment: req.body } );
  res.send(req.body);
});

// Server listens on port
server.listen(runningPortNumber, function(){
  console.log('Listening on port ' + this.address().port);
});
