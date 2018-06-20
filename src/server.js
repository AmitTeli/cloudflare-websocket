var express = require('express')
var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var WebSocketServer = require('ws').Server;
var credentials = {key: privateKey, cert: certificate};


var app = express()

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/ws.html');
})

//Please note that cloudflare has specific ports for http and https connections
//we need to choose from those

//Server to serve the html.
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443);

//Server to provide secured web socket
var wshttpsServer = https.createServer(credentials, app);
wshttpsServer.listen(2083);

var wss = new WebSocketServer({
    server: wshttpsServer
});

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message)
  });

  setInterval(
    () => ws.send(`${new Date()}`),
    2000
  );
});
