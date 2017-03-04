var http    = require('http'),
    express = require('express'),
    app     = express(),
    server  = http.createServer(app),
    // Pass a http.Server instance to the listen method
    io      = require('socket.io').listen(server);

// Listen on port
server.listen(5000);

// GET: / 
// Register the index route of your app that returns the HTML file
app.get('/', function (req, res) {
    console.log("Homepage");
    res.sendFile(__dirname + '/index.html');
});

// POST: moments
// Process incoming data and emit to webapp 
app.post('/moments', function (req, res) {
    io.sockets.emit('news', req.body);
    res.send({});
});

// Expose the node_modules folder as static resources (to access socket.io.js in the browser)
app.use('/static', express.static('node_modules'));

// Handle socket connection
io.on('connection', function (socket) {
    console.log("Connected succesfully to the socket ...");

    // Send news on the socket
    socket.emit('news', 'startup');

    socket.on('my other event', function (data) {
        console.log(data);
    });
});
