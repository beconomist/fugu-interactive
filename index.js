var express = require('express');
var app = express();
//
// app.get('/', function(req, res) {
//   res.send("Hello World!");
// });
//
// app.set()
//
//
// app.listen(process.env.PORT || 3000, function() {
//   console.log("Example app listening on port 3000!");
// });

// app.set('port', (process.env.PORT || 3000));
//
// app.get('/', function(request, response) {
//     response.send("Hello World!");
// }).listen(app.get('port'), function() {
//   console.log('App is running, server is listening on port ', app.get('port'));
// });


var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

// 處理 form data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.post('/test', function(req, res) {
  res.json(req.body);

});

function send404(response) {
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.write("Error 404: resource not found");
  response.end();
}

function sendFile(response, filePath, fileContents) {
  response.writeHead(200, {"Content-Type": mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
  if (cache[absPath]) {
    sendFile(response, absPath, cache[absPath]);
  } else {
    fs.exists(absPath, function(exists) {
      if (exists) {
        fs.readFile(absPath, function(err, data) {
          if (err) {
            send404(response);
          } else {
            cache[absPath] = data;
            sendFile(response, absPath, data);
          }
        });
      } else {
        send404(response);
      }
    });
  }
}

var server = http.createServer(function(request, response) {
  var filePath = false;


  if (request.url == "/") {
    filePath = "public/index.html";
  } else {
    filePath = "public" + request.url;
    console.log('filaPath: ' + filePath );
  }

  var absPath = './' + filePath;
  serveStatic(response, cache, absPath);

});

server.listen(process.env.PORT || 3000, function() {
  console.log("Fugu-Interactive server listening on port 3000.");
})

// var nodemailer = require('nodemailer');
// var mailTransport = nodemailer.createTransport('SMTP', {
//   service: 'Gmail',
//   auth: {
//     user: credentials.gmail.,
//
//
