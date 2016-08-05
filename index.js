var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};
var connect = require('connect');
var bodyParser = require('body-parser');

// 瀏覽器讀取官網首頁時，送 index.html 回去
app.get('/', function(req, res) {
  res.sendFile('public/index.html', {root: __dirname})
});

// 讓伺服器提供 public 檔案夾裡的檔案
app.use(express.static('public'));

// 啟動伺服器
app.listen(process.env.PORT || 3000, function() {
  console.log("Fugu-Interactive app is running on port 3000!");
});

// 處理 form data
var emailInput = "";

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/', function(req, res, emailHandler) {

  console.log("The user entered " + req.body.email);

  emailInput = req.body.email;

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertDocument(db, function() {
      db.close();
    });
  });
})

// 以下為 MongoDB 程式碼
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
// var url = 'mongodb://localhost:27017/test'; // Mongo URI for Development
var url = ' mongodb://bao :00hottiedude@ds139655.mlab.com:39655/heroku_lcw1f34v'  // Mongo URI for Production

var insertDocument = function(db, callback) {
  db.collection('emails').insertOne({
    "email" : emailInput
}, function(err, result) {
  assert.equal(err, null);
  console.log("Inserted " + emailInput + " into the emails collection ");
  callback();
  });
};


// 將所有資料記錄 log 出來
// var findEmails = function(db, callback) {
//    var cursor =db.collection('emails').find( );
//    cursor.each(function(err, doc) {
//       assert.equal(err, null);
//       if (doc != null) {
//          console.dir(doc);
//       } else {
//          callback();
//       }
//    });
// };
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   findEmails(db, function() {
//     db.close();
//   });
// });
// 以上為 MongoDB 設定


// 以下為純 Node.js 伺服器
// function send404(response) {
//   response.writeHead(404, {"Content-Type": "text/plain"});
//   response.write("Error 404: resource not found");
//   response.end();
// }
//
// function sendFile(response, filePath, fileContents) {
//   response.writeHead(200, {"Content-Type": mime.lookup(path.basename(filePath))});
//   response.end(fileContents);
// }
//
// function serveStatic(response, cache, absPath) {
//   if (cache[absPath]) {
//     sendFile(response, absPath, cache[absPath]);
//   } else {
//     fs.exists(absPath, function(exists) {
//       if (exists) {
//         fs.readFile(absPath, function(err, data) {
//           if (err) {
//             send404(response);
//           } else {
//             cache[absPath] = data;
//             sendFile(response, absPath, data);
//           }
//         });
//       } else {
//         send404(response);
//       }
//     });
//   }
// }
//
// var server = http.createServer(function(request, response) {
//   var filePath = false;
//
//
//   if (request.url == "/") {
//     filePath = "public/index.html";
//   } else if (request.url == "/test") {
//     console.log(request.body);
//     console.log("in routing!");
//   } else {
//     filePath = "public" + request.url;
//     console.log('filaPath: ' + filePath );
//   }
//
//   var absPath = './' + filePath;
//   serveStatic(response, cache, absPath);
//
// });
//
// server.listen(process.env.PORT || 3000, function() {
//   console.log("Fugu-Interactive server listening on port 3000.");
// })
// 以上為純 Node.js伺服器

// var nodemailer = require('nodemailer');
// var mailTransport = nodemailer.createTransport('SMTP', {
//   service: 'Gmail',
//   auth: {
//     user: credentials.gmail.,
